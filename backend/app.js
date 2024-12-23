const express = require("express")
const cors = require("cors")
const clientes = require("./client")
const sequelize = require("./db")
const { QueryTypes } = require("sequelize")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post("/clientes", async (req, res) => {
    const {
        nome, celular, rua, numeroRua, bairro, cidade, estado,
        marcaAparelho, modeloAparelho, defeito, conserto,
        valorConserto, formaPagamento, garantia
    } = req.body;

    const pagamento = formaPagamento ? true : false;
    const dataPagamento = pagamento ? new Date() : null;  

    try {
        console.log("Dados recebidos para cadastro:", req.body);

        const novoCliente = await clientes.create({
            nome, celular, rua, numeroRua, bairro, cidade, estado,
            marcaAparelho, modeloAparelho, defeito, conserto: conserto == "" ? "Orçamento" : conserto,
            valorConserto: !valorConserto ? 0 : valorConserto, formaPagamento, garantia, pagamento: false,  // Inicialmente não pago
            dataPagamento: pagamento ? new Date().toISOString() : null  // Salvando no formato ISO 8601
        });

        res.status(201).json({ message: "Cliente cadastrado com sucesso!", cliente: novoCliente });
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        res.status(500).json({ error: "Erro ao cadastrar cliente" });
    }
});



app.get("/clientes", async (req, res) => {

    try {
        const listaClientes = await clientes.findAll()
        res.status(200).json(listaClientes)
    } catch (error) {
        console.error("Erro ao buscar clientes: ", error)
        res.status(500).json({ Erro: "Erro ao buscar clientes", detalhe: error.message })
    }

})


app.put("/clientes/:id", async (req, res) => {
    const { id } = req.params
    const dadosAtualizados = req.body

    if (dadosAtualizados.pagamento === true && !dadosAtualizados.dataPagamento) {
        dadosAtualizados.dataPagamento = new Date();  // Atribui a data atual quando o pagamento é feito
    }

    try {
        const [linhasAtualizadas] = await clientes.update(dadosAtualizados, {
            where: { id: id }
        })

        if (linhasAtualizadas === 0) {
            return res.status(404).json({ message: "Cliente não encontrado" })
        }

        res.status(200).json({ message: `Cliente ${id} atualizado com sucesso!`, dados: dadosAtualizados })
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar cliente: ", error })
    }

})


app.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params

    try {
        const clienteDeletar = await clientes.destroy({ where: { id } })

        if (clienteDeletar) {
            res.status(200).json({ message: `Cliente com ID ${id} foi apagado com sucesso!` })
        } else {
            res.status(404).json({ message: `Cliente com ID ${id} não encontrado.` })
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao apagar cliente", error })
    }
})


//____________________________________________


// Função que realiza a busca de clientes com faturamento
async function fetchClientesFaturamento(view) {
    let query;
    if (view === "daily") {
        query =
            `SELECT 
                modeloAparelho,  -- Modelo do aparelho
                conserto AS servico,
                valorConserto AS valor,
                DATE_FORMAT(dataPagamento, '%H:%i') AS hora
            FROM clientes
            WHERE DATE(dataPagamento) = CURDATE() AND pagamento = true
            ORDER BY dataPagamento ASC`;
    } else if (view === "weekly") {
        query =
            `SELECT 
                DAYNAME(dataPagamento) AS dia_semana,  -- Nome do dia da semana (Segunda, Terça, ...)
                SUM(valorConserto) AS valor
            FROM clientes
            WHERE YEARWEEK(dataPagamento, 1) = YEARWEEK(CURDATE(), 1) AND pagamento = true
            GROUP BY dia_semana
            ORDER BY FIELD(dia_semana, 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo') ASC`;
    } else if (view === "monthly") {
        query =
            `SELECT 
                DAY(dataPagamento) AS dia_mes,  -- Número do dia do mês
                SUM(valorConserto) AS valor
            FROM clientes
            WHERE MONTH(dataPagamento) = MONTH(CURDATE()) AND YEAR(dataPagamento) = YEAR(CURDATE()) AND pagamento = true
            GROUP BY dia_mes
            ORDER BY dia_mes ASC`;
    } else if (view === "yearly") {
        query =
            `SELECT 
                MONTHNAME(dataPagamento) AS mes,  -- Nome do mês
                SUM(valorConserto) AS valor
            FROM clientes
            WHERE YEAR(dataPagamento) = YEAR(CURDATE()) AND pagamento = true
            GROUP BY mes
            ORDER BY FIELD(mes, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro') ASC`;
    } else {
        query =
            `SELECT * FROM clientes
            WHERE pagamento = true
            ORDER BY dataPagamento DESC`;
    }

    console.log("Executando query:", query);  // Log da query para depuração
    const resultado = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log("Resultado da query:", resultado);  // Verifica se há dados no resultado
    return resultado;
}


// Rota original de /clientes que usa a função de busca
app.get("/clientes", async (req, res) => {
    const { view } = req.query;
    try {
        const listaClientes = await fetchClientesFaturamento(view);
        res.status(200).json(listaClientes);
    } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
        res.status(500).json({ Erro: "Erro ao buscar clientes" });
    }
});

// Rota adicional /clientes/faturamento que reutiliza a função
app.get("/clientes/faturamento", async (req, res) => {
    const { view } = req.query;
    try {
        const listaClientes = await fetchClientesFaturamento(view);
        res.status(200).json(listaClientes);
    } catch (error) {
        console.error("Erro ao buscar faturamento de clientes: ", error);
        res.status(500).json({ Erro: "Erro ao buscar faturamento de clientes" });
    }
});
















const PORT = 8090

app.listen(PORT, () => {
    console.log("Servidor rodando... " + PORT);
})