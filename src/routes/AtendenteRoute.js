const express = require("express")
const router = express.Router()
const AtendenteModel = require("./../models/AtendenteModel")
const md5 = require("md5")

router.get("/atendente", async (req, res) => {
    const atendentes = await AtendenteModel.find({})
    return res.status(200).send(atendentes)
})

router.post("/atendente", async (req, res) => {
    try {
        const atendente = await AtendenteModel.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: md5(req.body.senha)
    })
        return res.status(200).send(atendente)
    }catch (error) {
    
        if(error.code == 11000) {
            return res.status(400).send("Atendente já existente")
        }
        return res.status(500).send(error)
    }
    })
    
router.put("/atendente/:id", async (req, res) => {
    const id = req.params.id
    const atualizado = await AtendenteModel.findOneAndUpdate({_id: id}, req.body, {upsert: false, new: true})
        return res.status(200).send(atualizado)    
})

router.delete("/atendente/:id" , async (req, res) => {
    const id = req.params.id
    await AtendenteModel.findOneAndDelete({ _id: id})
        return res.status(200).send(" Atendente removido")
})

router.get("/atendente/:cpf" , async (req, res) => {
    const cpf = req.params.cpf
    const atendente = await AtendenteModel.findOne ({ cpf: cpf})
    if(!atendente || !atendente._id) {
        return res.status(404).send("Atendente não cadastrado!")
    }
    return res.status(200).send(atendente)
    
})

module.exports = router