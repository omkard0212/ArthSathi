import { Router } from "express";
import { createFinancialProfile, getFinancialProfile, upsertFinancialProfile } from "../controllers/financial-profiles.controller";

const router = Router();

router.get("/:userId", getFinancialProfile);
router.put("/:userId", upsertFinancialProfile);
router.post("/", createFinancialProfile);

export default router;
