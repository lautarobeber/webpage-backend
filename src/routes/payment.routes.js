import { Router } from "express";
import { createOrder, getOrders, receiveWebhook } from "../controllers/payment.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router()


router.post('/create-order', createOrder);
router.post('/succes', receiveWebhook);
router.get('/succes',  receiveWebhook);
router.post('/webhook', authRequired,/*  receiveWebhook */);
router.get('/orders', authRequired, getOrders )


export default router;