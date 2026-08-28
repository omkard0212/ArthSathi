import { Router } from "express";
import { getMatchedSchemes } from "../controllers/schemes.controller";

const router = Router();

router.get("/match", getMatchedSchemes);

export default router;
