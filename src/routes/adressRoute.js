import AdressController from "../controllers/adressController";
import Authenticate from "../Utils/Authenticate"

export default (app) => {
    app.post('/adress/persist/:id',Authenticate, AdressController.persist);
    app.post('/adress/delet/:id',Authenticate, AdressController.delet);
    app.get('/adress/getid/:id',Authenticate, AdressController.getById);
    app.get('/adress/getall', Authenticate, AdressController.getAll);
    app.post('/adress/persist',Authenticate, AdressController.persist);
}   