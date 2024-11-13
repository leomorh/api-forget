import Adress from "../models/AdressModel";
import Util from "../Utils/getUserByToken";


const getAll = async (req, res) => {
    let user = await Util.getUserByToken(req.headers.authorization)
    try {
        const response = await Adress.findAll({
            where: {
                idUser: user.id
            }
        })

        if (!response) {
            return res.status(200).send({
                type: 'warning',
                message: `Não foi encontrado nenhum registro `
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Registros recuperados com sucesso',
            data: response
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const persist = async (req, res) => {
    try {
        let user = await Util.getUserByToken(req.headers.authorization)
        let { id } = req.params;
        if (!id) {

            return await create(user.id, req.body, res)
        }
        return await update(id, user.id ,req.body, res)
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error
        });
    }
}

const create = async (token, data, res) => {
    try {
        let { zip_code, state, city, street, district, number } = data;

        let response = await Adress.create({
            zip_code,
            state,
            city,
            street,
            district,
            number_forget: number,
            idUser: token
        })

        return res.status(200).send({
            type: 'success',
            message: 'Registro criado com sucesso',
            data: response
        });

    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error
        });
    }
}

const update = async (id, datas, res) => {
    try {
        let response = await Adress.findOne({
            where: {
                id: id,
            },
        });
        if (!response) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado com o id ${id}`
            });
        }
        Object.keys().forEach(data => response[data] = datas[data])

        await response.save();

        return res.status(200).send({
            type: 'success',
            message: 'Registros atualizados com sucesso',
            data: response,
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}


const delet = async (req, res) => {
    try {
        let { id } = req.params
        if (!id) {
            return res.status(200).send({
                type: 'warning',
                message: 'Informe um id válido para deletar a categoria',
            });
        }

        let response = await Adress.findOne({
            where: {
                id: id
            }
        })


        if (!response) {
            return res.status(200).send({
                type: 'warning',
                message: `Não foi encontrada categoria com o id ${id}`,
            });
        }
        await response.destroy()
        return res.status(200).send({
            type: 'sucess',
            message: `registro com o id ${id} deletado com sucesso`,
        });

    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        let {id} = req.params

        if (!id) {
            return res.status(200).send({
                type: 'warning',
                message: 'Informe um ID valido para consulta'
            });
        }

        const response = await Adress.findOne({
            where: {
                id: id,
            }
        });

        if (!response) {
            return res.status(200).send({
                type: 'warning',
                message: `Não foi encontrado registro com o id = ${id}`
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Registros recuperados com sucesso',
            data: response
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}


export default {
    persist,
    delet,
    getById,
    getAll,
}