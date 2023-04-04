const chave = "12345"

function autenticar(req, res, next) {
    const token = req.headers.token

    if(token === chave) {
        return next()
    }

    return res.status(401).send("Unauthorized")
}

module.exports = autenticar