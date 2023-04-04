const mongoose = require('mongoose')

const PratoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    descricao: String,
    infos: Object,
    imagem: String
})

const PratoModel = mongoose.model("Prato", PratoSchema)


module.exports = PratoModel;