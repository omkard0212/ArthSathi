import { Request, Response } from "express";
import pool from "../db/pool";

const VALID_GOALS = ["marriage", "education", "business", "health", "house"];

export async function createFinancialProfile(req: Request, res: Response): Promise<void> {
  const { user_id, monthly_income, existing_debts, goal_category } = req.body;

  if (!user_id || typeof user_id !== "string") {
    res.status(400).json({ error: "user_id is required" });
    return;
  }
  if (monthly_income === undefined || monthly_income === null || isNaN(Number(monthly_income))) {
    res.status(400).json({ error: "monthly_income is required and must be a number" });
    return;
  }
  if (existing_debts === undefined || existing_debts === null || isNaN(Number(existing_debts))) {
    res.status(400).json({ error: "existing_debts is required and must be a number" });
    return;
  }
  if (!goal_category || !VALID_GOALS.includes(goal_category)) {
    res.status(400).json({ error: `goal_category must be one of: ${VALID_GOALS.join(", ")}` });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO financial_profiles (user_id, monthly_income, existing_debts, goal_category)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, monthly_income, existing_debts, goal_category, created_at`,
      [user_id, Number(monthly_income), Number(existing_debts), goal_category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: unknown) {
    // Unique violation — profile already exists for this user
    if (
      typeof err === "object" &&
      err !== null &&
      (err as { code?: string }).code === "23505"
    ) {
      res.status(409).json({ error: "A financial profile already exists for this user" });
      return;
    }
    // Foreign key violation — user_id doesn't exist
    if (
      typeof err === "object" &&
      err !== null &&
      (err as { code?: string }).code === "23503"
    ) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    console.error("[createFinancialProfile] Unexpected error:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}
