
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



export default {
    oi
}