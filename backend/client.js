const { DataTypes } = require("sequelize")
const sequelize = require("./db")

const clientes = sequelize.define("Clientes", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    celular: {
        type: DataTypes.STRING
    },

    rua: {
        type: DataTypes.STRING
    },

    numeroRua: {
        type: DataTypes.STRING
    },

    bairro: {
        type: DataTypes.STRING
    },

    cidade: {
        type: DataTypes.STRING
    },

    estado: {
        type: DataTypes.STRING
    },

    marcaAparelho: {
        type: DataTypes.STRING
    },

    modeloAparelho: {
        type: DataTypes.STRING
    },

    defeito: {
        type: DataTypes.STRING
    },

    conserto: {
        type: DataTypes.STRING
    },

    valorConserto: {
        type: DataTypes.DECIMAL(10, 2)
    },

    formaPagamento: {
        type: DataTypes.STRING
    },

    garantia: {
        type: DataTypes.TEXT
    },

    pagamento: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    dataPagamento: {
        type: DataTypes.DATE, 
        allowNull: true
    },
})

//  sequelize.sync({ force: true })
//     .then(() => {
//         console.log("Tabela 'clientes' criada com sucesso!");
//     })
//     .catch((err) => {
//         console.error("Erro ao criar a tabela:", err);
//  });


module.exports = clientes