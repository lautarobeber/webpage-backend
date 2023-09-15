import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {addProducts, deleteProducts, getProduct, getProducts, updateProducts } from '../controllers/products.controllers.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from "../schemas/product.schema.js";
import upload from "../libs/storage.js";

const router = Router()

router.get('/products', authRequired, getProducts);
router.get('/products/:id', authRequired, getProduct);
router.post('/products', authRequired, validateSchema(productSchema), upload.single('image'), addProducts);
router.put('/products/:id', authRequired, updateProducts);
router.delete('/products/:id', authRequired, deleteProducts);


export default router;