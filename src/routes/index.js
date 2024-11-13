import userRoute from "./userRoute";
import adressRoute from "./adressRoute";
import orderRoute from "./orderRoute";

export default function (app) {
  userRoute(app);
  adressRoute(app);
  orderRoute(app);
}