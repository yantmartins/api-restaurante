const express = require("express")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage })

const PratoModel = require("../models/PratoModel")
const router = express.Router()

router.get("/prato", async (req, res) => {
    const pratos = await PratoModel.find({})
    return res.status(200).send(pratos)
})

router.put("/prato/:id", upload.single("imagem"), async (req, res) => {
    const id = req.params.id
    const dadosAtualizados = { ...req.body }

    if(req.file && req.file.path) {
        dadosAtualizados.imagem = req.file.path
    }

    const atualizado = await PratoModel.findOneAndUpdate({_id: id}, dadosAtualizados, {upsert: false, new: true})
    return res.status(200).send(atualizado)
})

const fs = require('fs');

router.delete("/prato/:id", async (req, res) => {
    const id = req.params.id
    const deletado = await PratoModel.findOneAndDelete({ _id: id})
    fs.unlinkSync(deletado.imagem)
    return res.status(200).send("Deletado com sucesso!")
})

router.post("/prato", upload.single("imagem"), async (req, res) => {
    try {
        const prato = await PratoModel.create({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao,
            info: req.body.info,
            imagem: req.file.path
    })
        return res.status(200).send(prato)
    }catch (error) {
    console.log(error);
        if(error.code == 11000) {
            return res.status(400).send("Prato já existente")
        }
        return res.status(500).send(error)
    }
    })

module.exports = router