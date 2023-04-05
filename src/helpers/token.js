const jwt = require("jsonwebtoken")
const SEGREDO = process.env.CHAVE_TOKEN

function gerarToken() {
    const usuario = {
        nome: "Yan",
        email: "yantmartins@live.com",
        funcao: "ADMIN"
    }
    return jwt.sign(usuario, SEGREDO)
}

function validarToken(token) {
    return jwt.verify(token, SEGREDO)
}

module.exports = {
    gerarToken,
    validarToken
}