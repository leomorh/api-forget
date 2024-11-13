import AdressController from "../controllers/adressController";
import Authenticate from "../Utils/Authenticate"

export default (app) => {
    app.get('/adress/persist/:id', AdressController.persist);
    app.post('/adress/delet/:id', AdressController.delet);
    app.get('/adress/getid/:id', AdressController.getById);
    app.get('/adress/getall',Authenticate, AdressController.getAll);
}