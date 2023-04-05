const chave = process.env.CHAVE_TOKEN
const tokenHelper = require("./../helpers/token")
function autenticar(funcoes = []) {
    return (req, res, next) => {
        try {
            const token = req.headers.token
            const conteudo = tokenHelper.validarToken(token)
            console.log(funcoes, conteudo.funcao);
            if(funcoes.includes(conteudo.funcao)) {
                return next()
            }
            
            return res.status(403).send("Prohibited")
        } catch (error) {
            return res.status(401).send({
                mensagem: "Unauthorized",
                err: error
            })
        }   

    }      
}

module.exports = autenticar