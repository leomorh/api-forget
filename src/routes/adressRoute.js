import adressController from "../controllers/adressController";

export default (app) => {
    app.get('/adress/create', adressController.create);
}