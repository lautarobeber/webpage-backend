import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getUsers} from '../controllers/users.controller.js'


const router = Router();

router.get('/users', /* authRequired, */ getUsers)

export default router;