const { Sequelize } = require("sequelize")
const sequelize = new Sequelize("banco_chcell", "root", "36394531", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(() => {
    console.log("conectado com sucesso!")
}).catch((err) => {
    console.log("não foi possivel conectar: " + err)
})





module.exports = sequelize