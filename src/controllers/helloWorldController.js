
const oi = (req, res) => {
    try {
        return res.status(200).send({
            oi: 'oi',
            algo: [
                {
                    coiso: 'oi'
                }
            ]
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

const oiPorParametro = (req, res) => {
    try {
        const {
            nome,
            tchau,
        } = req.params
        return res.status(200).send({
            oi: 'oi' + ' ' + nome,
            algo: [
                {
                    coiso: 'oi' + ' ' + tchau
                }
            ]
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })  
    }
}

const postOi = (req, res) => {
    try {
        const corpo = req.body
        console.log(corpo);
        
        return res.status(200).send({
            message: 'seu nome é: ' + corpo.nome
        })
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })  
    }
}



export default {
    oi,
    oiPorParametro,
    postOi
}