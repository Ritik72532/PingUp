import express from "express"
import { login, signUp , logout, allUsers } from "../controllers/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();
router.post("/signup",signUp);
router.post("/login",login);
router.post("/logout",logout);
router.get("/allusers",secureRoute ,allUsers);
export default router