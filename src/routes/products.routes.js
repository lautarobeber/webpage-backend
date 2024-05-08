import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {addProducts, deleteByCatID, deleteProducts, getProduct, getProducts, updateProducts } from '../controllers/products.controllers.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from "../schemas/product.schema.js";
import upload from "../libs/storage.js";

/* import User from "../models/sql_models/users.model.js"; */

const router = Router()

router.get('/products',  getProducts);
router.get('/products/:id', getProduct);
router.post('/products', authRequired, upload.single('src'), addProducts);
router.put('/products/:id', authRequired, updateProducts);
router.delete('/products/:id', authRequired, deleteProducts);
router.delete('/productsDelete', authRequired, deleteByCatID);


/* router.get('/test', (req, res) => {
    const result = User.findAll();
})
 */


export default router;