import { Router } from "express";
import * as ControladorAuth from "../controllers/auth.controller.js"


const router = Router();


router.post("/login", ControladorAuth.login);

export default router;