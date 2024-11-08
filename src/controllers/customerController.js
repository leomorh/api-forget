import Customer from '../models/CustomerModel';

const get = async (req, res) => {
    try {
        const {
            cafe
        } = req.params;
        let response = []

        if (!cafe){
            response = await Customer.findAll();
            return res.status(200).send(response);
        }

        response = await Customer.findOne({
            where: {
                id: cafe
            }
        });
        return res.status(200).send(response);
    } catch (e) {
        return res.status(500).send({
            error: e.message
        })
    }
}

const create = async (req, res) => {
    try {
        const {
            id,
            name,
            street,
            city,
            state,
            creditLimit,
        } = req.body;

        const response = await Customer.create({
            id,
            name,
            street,
            city,
            state,
            creditLimit,
        });

        return res.status(201).send({
            message: 'Criado Com sucesso',
            response
        });
    } catch (e) {
        return res.status(500).send({
            error: e.message
        })
    }
}

const deleta = async (req, res) => {
    try {
        const {
            id,
        } = req.params;

        await Customer.destroy({
            where: {
                id
            }
        });

        return res.status(410).send({
            message: 'deletado Com sucesso',
        });
    } catch (e) {
        return res.status(500).send({
            error: e.message
        })
    }
}



export default {
    get,
    create,
    deleta
}