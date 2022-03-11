import { Router } from "express";

import { register, login } from "../controllers/userAuth.controller.js";
import { registerValidator, loginValidator } from "../validator/user.validator.js";

const router = new Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login)


export default router