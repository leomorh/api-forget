import orderController from "../controllers/orderController";
import Authenticate from "../Utils/Authenticate";

export default (app) => {
    app.post('/order/delet/:id',Authenticate,orderController.delet);
}
