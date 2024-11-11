import userController from "../controllers/userController";

export default (app) => {
    app.post("/user/register", userController.register);
    app.post("/user/update", userController.update);
    app.post("/user/delete", userController.delete);
    
}