import { Router } from "express";
import { createFinancialProfile } from "../controllers/financial-profiles.controller";

const router = Router();

router.post("/", createFinancialProfile);

export default router;
