import userController from "../controllers/userController";
import Authenticate from "../Utils/Authenticate";
import Email from "../Utils/Email";


export default (app) => {
    app.post("/user/persist/:id", userController.persist);
    app.post("/user/persist", userController.persist);
    app.get("/user/get/:id",Authenticate, userController.get);
    app.post("/user/login", userController.login);
    app.get("/user/getAll",Authenticate, userController.getAll);
    app.post("/user/delet/:id",Authenticate, userController.delet);
    app.post("/send", Email.send);
    app.post("/code", Email.receiveCode);
    app.post("/newPassword", Email.updatePassword);

}