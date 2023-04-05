const express = require('express')

const autenticar = require ("../middleware/Autenticador")

const MesaModel = require("./../models/MesaModel")

const router = express.Router()

router.get('/mesa', autenticar(["ADMIN", "GERENTE", "ATENDENTE"]), async (req, res) => {
    const mesas = await MesaModel.find()
    return res.status(200).send(mesas)
})


router.post('/mesa', autenticar(['ADMIN', 'GERENTE']),async (req, res) => {

    try {
    const mesaCriada = await MesaModel.create({
        numero: req.body.numero
})
    return res.status(200).send(mesaCriada)
}catch (error) {

    if(error.code == 11000) {
        return res.status(400).send("Número de Mesa já existente")
    }
    return res.status(500).send(error)
}
})


router.delete("/mesa/:numero" , async (req, res) => {
    const numero = req.params.numero;
    await MesaModel.findOneAndDelete({ numero: numero})

    return res.status(200).send("Mesa deletada")
    
})
module.exports = router