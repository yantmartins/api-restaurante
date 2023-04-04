const mongoose = require("mongoose")

const PedidoSchema = new mongoose.Schema({
    atendente: {
        _id: false,
        atendente_id: String,
        nome: String,    
        cpf: String,
        email: String,
          
    },
    mesa: {
        _id: false,
        numero: String
    },
    pratos: [
        {
            _id: false,
            prato_id: String,
            nome: String,
            preco: Number,
            info: Object,
        }
    ],
    status: {
        type: String,
        required: true
    }
    }, {timestamps: true});

    const PedidoModel = mongoose.model("Pedido" , PedidoSchema)

    module.exports = PedidoModel
