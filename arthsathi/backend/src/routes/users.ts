import { Router } from "express";
import { createUser, getUserByPhone } from "../controllers/users.controller";

const router = Router();

router.get("/:phone", getUserByPhone);
router.post("/", createUser);

export default router;
