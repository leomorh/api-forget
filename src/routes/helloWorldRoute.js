import helloWorldController from "../controllers/helloWorldController";


export default function (app) {
  app.get('/hello-world/oi', helloWorldController.oi);
}