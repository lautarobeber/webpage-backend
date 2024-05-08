import { Router } from "express";
import { getOrders, getOrdersByUser, updateOrderShipped} from "../controllers/order.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/orders', authRequired, getOrders);
router.get('/ordersuser',authRequired ,getOrdersByUser)
router.patch('/orders/setShipped/:orderId',authRequired , updateOrderShipped)


export default router;

