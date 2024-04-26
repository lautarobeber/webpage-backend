import { Router } from "express";
import { addProductToCart, deleteOneProductFromCart, getProductsByCart, quantityCart, setSizeProductsByID } from "../controllers/cart.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post('/cart', authRequired, addProductToCart);
router.get('/cart/:id', authRequired, getProductsByCart);
router.patch('/cart/:id_product', authRequired, setSizeProductsByID);
router.delete('/cart/:id/:email', authRequired, deleteOneProductFromCart)
router.patch('/cart', quantityCart )

export default router;