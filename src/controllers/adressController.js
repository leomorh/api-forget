import Adress from "../models/AdressModel";


const getAll = async (req, res) => {
    try {
        const response = await Adress.findAll();

        if (!response || response.length === 0) {
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
        return res.status(500).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
};

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
        let { Zipcode, State, City, Street, District, Number, Complement, idUser } = data;

        let response = await Adress.create({
            Zipcode,
            State,
            City,
            Street,
            District,
            Number,
            Complement,
            idUser
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

const update = async (id, datas = {}, res) => {
    try {

      let response = await Adress.findOne({
        where: {
          id
        },
      });
  

      if (!response) {
        return res.status(404).send({
          type: 'error',
          message: `Não foi encontrado com o id ${id}`
        });
      }
  

      Object.keys(datas).forEach(data => {
        if (datas[data] !== undefined) { 
          response[data] = datas[data];
        }
      });
  

      await response.save();
  

      return res.status(200).send({
        type: 'success',
        message: 'Registros atualizados com sucesso',
        data: response,
      });
    } catch (error) {
      return res.status(500).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error.message
      });
    }
  };
  


  const delet = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id) {
            return res.status(400).send({
                type: 'warning',
                message: 'Informe um id válido para deletar o endereço',
            });
        }

        let response = await Adress.findOne({
            where: {
                id
            }
        });

        if (!response) {
            return res.status(404).send({
                type: 'warning',
                message: `Não foi encontrado o endereço com o id ${id}`,
            });
        }

        await response.destroy(); 

        return res.status(200).send({
            type: 'success',  
            message: `Endereço com o id ${id} deletado com sucesso`,
        });

    } catch (error) {
        return res.status(500).send({  
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message,
        });
    }
};


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