import Order from "../models/OrderModel";

const delet = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(200).send({
                type: 'warning',
                message: 'Informe um id válido para deletar a categoria',
            });
        }

        let response = await Order.findOne({
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

export default {
    delet,
}