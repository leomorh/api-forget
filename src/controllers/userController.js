import User from '../models/UserModel';
import jwt from "jsonwebtoken";
import crypto from "crypto";

const delet = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let response = []

        if (!id) {
            response = await User.findAll();
            return res.status(200).send(response)
        }

        response = await User.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).send({
                response,
                type: 'sucess',
                message: 'usuario excluido com sucesso'
        });
    } catch (e) {
        return res.status(500).send({
            error: e.message
        })
    }
}

const get = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let response = []

        if (!id){
            response = await User.findAll();
            return res.status(200).send(response);
        }

        response = await User.findOne({
            where: {
                id: id
            }
        });
        return res.status(200).send(response);
    } catch (e) {
        return res.status(500).send({
            error: e.message
        })
    }
}

const getAll = async (req, res) => {
    try {
        const response = await User.findAll();
        return res.status(200).send(response);

} catch (e) {
    return res.status(500).send({
        error: e.message
    })
}
}

const persist = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return await register(req.body, res)
        }
        return await update(id, req.body, res)

    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const register = async (data, res) => {
    try {
        let { Username, Name, Phone, Password, Role, Cpf, Email } = data;

        let userExists = await User.findOne({
            where: {
                Username
            }
        });

        if (userExists) {
            return res.status(200).send({
                type: 'error',
                message: 'Já existe um usuário cadastrado com esse username!'
            });
        }

            const passwordHash = (Password) => {
            const hash = crypto.createHash('sha256');
            hash.update(Password);
            return hash.digest('hex');
        }

        let response = await User.create({
            Username,
            Name,
            Phone,
            PasswordHash: passwordHash(Password),
            Role,
            Cpf,
            Email,
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'Usuário cadastrado com sucesso!',
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


const update = async (id, data, res) => {
    try {
        let response = await User.findOne({
            where: {
                id
            }
        })

        if (!response) {
            return res.status(200).send({
                type: 'error',
                message: `Não foi encontrado usuario com o id ${id}`
            });
        }

        let usernameForget = false;
        Object.keys(data).forEach(datas => {
            response[datas] = data[datas]
            if (datas == "username") {
                usernameForget = true
            }
        })

        await response.save()

        return res.status(200).send({
            type: 'sucess',
            message: 'Registros atualizados com sucesso, logue novamente!',
            usernameForget,
            data: response
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error,
        });
    }
}

const login = async (req, res) => {
    try {
        let {Username, Password} = req.body;
        let user = await User.findOne({
            where: {
                Username
            }
        });

        if (!user) {
            return res.status(404).send('Usuario não encontrado');
        }

        const passwordHash = (Password) => {
            const hash = crypto.createHash('sha256');
            hash.update(Password);
            return hash.digest('hex');
        }

        const storedPasswordHash = user.passwordHash;
        const providedPasswordHash = passwordHash(Password);

        if (providedPasswordHash !== storedPasswordHash) {
            return res.status(401).send({
                type: 'error',
                message: 'senha incorreta',
            });
        }

        let token = jwt.sign(
            { userId: user.id, Username: user.Username, Role: user.Role },
            process.env.TOKENKEY,
            { expiresIn: '1h' }
        );

            return res.status(200).send({
                type: 'sucess',
                message: 'Bem-vindo! Login realizado com sucesso!',
                data: user,
                token,
            });

        } catch(error)
        {
            return res.status(200).send({
                type: 'error',
                message: 'Ops! Ocorreu um erro!',
                data: error.message,
            });
        }

}




export default {
    get,
    persist,
    login,
    getAll,
    delet,
}