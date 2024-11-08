import helloWorldController from "../controllers/helloWorldController";


export default function (app) {
  app.get('/hello-world/oi', helloWorldController.oi);
  app.post('/hello-world/oi', helloWorldController.postOi);
  app.get('/hello-world/oi/parametro/:nome/:tchau', helloWorldController.oiPorParametro)
}