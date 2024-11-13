import userController from "../controllers/userController";
import authenticate from "../Utils/Authenticate";

export default (app) => {
    app.get("/user/persist/:id", userController.persist);
    app.get("/user/update", userController.update);
    app.post("/user/login", userController.login);
}