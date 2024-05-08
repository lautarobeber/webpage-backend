import { Router } from "express";
import { getCategories, addCategory, deleteOneCategory, getOneCategory } from "../controllers/category.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
const router = Router()

router.get("/categories", authRequired, getCategories)
router.get("/categories/:id", getOneCategory)
router.delete('/categories/:id', deleteOneCategory )
router.post('/categories', addCategory )


export default router