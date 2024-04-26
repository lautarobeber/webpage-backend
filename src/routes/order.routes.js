import { Router } from "express";
import { getOrders, getOrdersByUser} from "../controllers/order.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/orders', authRequired, getOrders);
router.get('/ordersuser',authRequired ,getOrdersByUser)


export default router;

