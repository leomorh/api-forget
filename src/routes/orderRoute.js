import orderController from "../controllers/orderController";

export default (app) => {
    app.post('/order/delet/:id',orderController.delet);
}
