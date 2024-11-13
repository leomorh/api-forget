import User from '../models/UserModel';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


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

        const response = await User.create({
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
        let { username, name, phone, password, role, cpf,email } = data;

        let userExists = await User.findOne({
            where: {
                username
            }
        });

        if (userExists) {
            return res.status(200).send({
                type: 'error',
                message: 'Já existe um usuário cadastrado com esse username!'
            });
        }

        let passwordHash = await bcrypt.hash(password, 10);

        let response = await User.create({
            username,
            name,
            phone,
            passwordHash,
            role,
            cpf,
            email
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'Usuário cadastrastado com sucesso!',
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
                message: `Não foi encontrado categorias com o id ${id}`
            });
        }
        console.log(Object.keys(data));
        console.log(data);
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
        let { username, password } = req.body;
        let user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }

        let token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.TOKEN_KEY,
            { expiresIn: '1h' }
        );

        user.token = token;
        await user.save();

        return res.status(200).send({
            type: 'sucess',
            message: 'Bem-vindo! Login realizado com sucesso!',
            data: user,
            token,
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
        });
    }
}


export default {
    get,
    create,
    register,
    update,
    persist,
    login
}