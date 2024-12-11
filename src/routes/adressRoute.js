import AdressController from "../controllers/adressController";
import Authenticate from "../Utils/Authenticate"

export default (app) => {
    app.post('/adress/persist/:id', AdressController.persist);
    app.post('/adress/delet/:id', AdressController.delet);
    app.get('/adress/getid/:id', AdressController.getById);
    app.get('/adress/getall', AdressController.getAll);
    app.post('/adress/persist', AdressController.persist);
}   