import { Router } from "express";
import { createSession, createSessionFromCart, stripeWebhookController } from "../controllers/payment.stripe.controllers.js";
import express from "express";
import bodyParser from "body-parser";
import Stripe from "stripe";
import { SECRET_KEY_STRIPE } from "../config.js";

const stripe = new Stripe(
    SECRET_KEY_STRIPE
  );
  


const router = Router();

router.post('/create-checkout-session', createSession);
router.post('/create-checkout-session-cart', createSessionFromCart);
router.post('/stripe-webhook', /*  async (req, res ) => {
    let secret = 'whsec_MrwKbllvatMgGY9JJqyd6CotDhLY8PqO'
    console.log(req.rawBody)
    const sig = req.headers['stripe-signature']


    let event 

    try{
        event = stripe.webhooks.constructEvent(req.rawBody, sig, secret)
    }catch(e){
        console.log(e.message)
        res.status(400).json({ success: false})
        return
    }

    console.log(event.type)
    console.log(event.data.object)
    console.log(event.data.object.id)

    res.json({
        success: true
    })

} */ stripeWebhookController);
router.get('/realizado', (req, res) => res.send('Payment Success'))
router.get('/cancelado', (req, res) => res.send('Payment Denied'))

export default router;