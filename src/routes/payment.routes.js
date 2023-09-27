import { Router } from "express";
import { createOrder, receiveWebhook } from "../controllers/payment.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router()


router.post('/create-order', createOrder);
router.post('/succes', receiveWebhook);
router.get('/succes',  receiveWebhook);
router.post('/webhook', authRequired,/*  receiveWebhook */);


export default router;