const express = require('express')
const PedidoModel = require('../models/PedidoModel')
const MesaModel = require('./../models/MesaModel')
const AtendenteModel = require('./../models/AtendenteModel')
const PratoModel = require('./../models/PratoModel')

const router = express.Router()

router.put("/finalizar-pedido:id" , async (req, res) =>{
    // encontrar o pedido
    const pedido = await PedidoModel.findOne({_id: req.params.id})

    if(!pedido || !pedido._id) {
        return res.status(400).send("Pedido não encontrado")
    }

    // mudar o status do pedido para finalizado
    pedido.status = "Finalizado"
    let soma = 0
    for (const prato of pedido.pratos) {
        const precoTotalPrato = prato.preco * prato.quantidade
        soma+=precoTotalPrato        
    }

    // calcular o preço final
    const pedidoFinalizado = await PedidoModel.findOneAndUpdate(
        {_id: pedido._id}, pedido, {upsert: false, new: true}
    )

    // devolver resultado
    return res.status(200).send({pedido: pedidoFinalizado, valorTotal: soma})
})

router.post("/pedido", async (req, res) => {
    const { atendente_id, mesa_id, pratos } = req.body;

    /*  A linha de cima resume o codigo abaixo 

    const atendente_id = req.body.atendente_id
    const mesa_id = req.body.mesa_id
    const pratos = req.body.pratos
    */

 // Buscar a mesa por ID
    const mesa = await MesaModel.findOne({ _id: mesa_id})

    if( !mesa || !mesa._id) {
        return res.status(400).send("Mesa informada não existe!")
    }

// Buscar o atendente por ID 
    const atendente = await AtendenteModel.findOne({_id: atendente_id})
    if(!atendente || !atendente._id) {
        return res.status(400).send("Atendente não existente!!!")
    }
// Buscar todos os pratos por ID
const listaPratosFinal = []
for (let index = 0; index < pratos.length; index++) {
    const pratoItem = pratos[index];
    const pratoBD = await PratoModel.findOne({ _id: pratoItem.prato_id })

    if(!pratoBD || !pratoBD._id) {
        return res.status(400).send("Prato não existe!")
    }

    listaPratosFinal.push({
       quantidade: pratoItem.quantidade,
       prato_id: pratoBD._id,
       nome: pratoBD.nome,
       preco: pratoBD.preco,
       info: pratoBD.info,
    })
}
// criar o Pedido
const pedidoCriado = await PedidoModel.create({
    atendente: {
        atendente_id: atendente._id,
        nome: atendente.nome,
        cpf: atendente.cpf,
        email: atendente.email,
    },
    mesa: {
        numero: mesa.numero
    },
    pratos: listaPratosFinal,
    status: 'Em Preparo'
})

return res.status(200).send(pedidoCriado)
})




router.get('/pedido', async (req, res) => {
let query = {}
if(req.query) {
    if (req.query.mesa) {
        query = { mesa: { numero: req.query.mesa } }
    }
}
const pedidos = await PedidoModel.find(query)
return res.status(200).send(pedidos)
})

router.put('/pedido/:id', async (req, res) => {
const id = req.params.id
const atualizado = await PedidoModel.findOneAndUpdate({_id: id}, req.body, {upsert: false, new: true})
return res.status(200).send(atualizado)
})

router.get('/pedido/:id', async (req, res) => {
const { id } = req.params;
const pedido = await PedidoModel.findOne({_id: id})

if(!pedido || !pedido._id) {
    return res.status(404).send('Pedido Inexistente!')
}
return res.status(200).send(pedido)
})


module.exports = router