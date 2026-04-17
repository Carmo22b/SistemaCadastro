# Sistema de Cadastro - Assistência Técnica

Sistema completo para gestão de uma assistência técnica, permitindo o cadastro de clientes, aparelhos, produtos e controle de serviços realizados.

O sistema também conta com controle de pagamentos, emissão de notas e dashboards com gráficos de desempenho.

---

## Funcionalidades

* Cadastro, edição e exclusão de clientes
* Cadastro de aparelhos (celulares, eletrônicos e outros)
* Cadastro de produtos
* Controle de serviços e ordens de serviço
* Status de pagamento (pago / pendente)
* Impressão de notas/ordens de serviço
* Dashboard com gráficos de vendas e estatísticas
* CRUD completo em todas as entidades

---

## Tecnologias utilizadas

### Frontend

* React
* Biblioteca de gráficos (Chart.js)
* Biblioteca de impressão (React-to-print)

### Backend

* Node.js
* Express
* Sequelize (ORM)

### Banco de Dados

* MySQL

---

## Funcionalidades do Dashboard

O sistema possui gráficos para análise de dados como:

* Total de vendas
* Serviços realizados
* Status de pagamentos
* Performance geral da assistência técnica

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Carmo22b/SistemaCadastro.git
```

### 2. Backend

```bash
cd backend
npm install
- Rode o nodemon (para auto-reload do servidor)
```

Configure o banco de dados:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

Depois rode:

```bash
npm start
```

---

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📸 Screenshots

![Dashboard](./images/dashboard.png)
![Cadastro de clientes](./images/clientes.png)
![Ordens de serviço](./images/os.png)

---

## Melhorias futuras

* Sistema de login com níveis de acesso
* Integração com pagamento online
* Upload de imagens dos aparelhos
* Exportação de relatórios em PDF
* Deploy em produção

---

## Autor

Desenvolvido por Carmo

* GitHub: https://github.com/Carmo22b
* Portfólio: https://carmo22b.github.io/Portf-lio/

---
