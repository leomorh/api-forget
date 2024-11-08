import customerController from "../controllers/customerController";

export default function (app) {
    app.get('/customer/get', customerController.get);
    app.get('/customer/get/:cafe', customerController.get);
    app.post('/customer/create', customerController.create);
    app.get('/customer/delete/:id', customerController.deleta);
}