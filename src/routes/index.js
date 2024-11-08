import helloWorldRoute from "./helloWorldRoute";
import customerRoute from "./customerRoute";

export default function (app) {
  helloWorldRoute(app);
  customerRoute(app);
}