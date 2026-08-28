import { Router } from "express";
import { createUser, getUserById, getUserByPhone } from "../controllers/users.controller";

const router = Router();

router.post("/", createUser);
router.get("/phone/:phone", getUserByPhone);
router.get("/:id", getUserById);

export default router;