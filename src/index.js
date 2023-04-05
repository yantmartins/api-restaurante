const express = require('express')
const app = express()
require("./db/mongodb")
app.use(express.json())
app.get('/', (req, res) => {
    return res.status(200).send('Api do Restaurante HT')
})
// ROTA - MESA
const MesaRoute = require('./routes/MesaRoute')
app.use(MesaRoute)

//ROTA - PRATO
const PratoRoute = require("./routes/PratoRoute")
app.use(PratoRoute)

// ROTA - ATENDENTE
const AtendenteRoute = require("./routes/AtendenteRoute")
app.use(AtendenteRoute)

// ROTA - PEDIDO
const PedidoRoute = require("./routes/PedidoRoute")
app.use(PedidoRoute)

const TokenRoute = require("./routes/TokenRoute")
app.use(TokenRoute)

const carregarModels = require("./models/index")
carregarModels()

app.use("/uploads", express.static("uploads"))

app.listen(3000, () => {
    console.log('Api rodando')
})