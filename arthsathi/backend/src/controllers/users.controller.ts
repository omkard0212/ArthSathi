import { Request, Response } from "express";
import pool from "../db/pool";

// Basic Indian mobile number: exactly 10 digits, starting with 6-9
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

export async function getUserByPhone(req: Request, res: Response): Promise<void> {
  const { phone } = req.params;

  if (!phone || !INDIAN_PHONE_REGEX.test(phone.trim())) {
    res.status(400).json({ error: "Valid 10-digit Indian mobile number required" });
    return;
  }

  try {
    const result = await pool.query(
      `SELECT id, phone_number, full_name, preferred_language, interaction_mode, aadhaar_verified, created_at
       FROM users WHERE phone_number = $1`,
      [phone.trim()]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("[getUserByPhone] Unexpected error:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const { phone_number, preferred_language, interaction_mode } = req.body;

  // --- Validation ---
  if (!phone_number || typeof phone_number !== "string") {
    res.status(400).json({ error: "phone_number is required" });
    return;
  }
  if (!INDIAN_PHONE_REGEX.test(phone_number.trim())) {
    res.status(400).json({
      error: "phone_number must be a valid 10-digit Indian mobile number",
    });
    return;
  }
  if (!preferred_language || typeof preferred_language !== "string" || !preferred_language.trim()) {
    res.status(400).json({ error: "preferred_language is required" });
    return;
  }
  if (!interaction_mode || !["voice", "text"].includes(interaction_mode)) {
    res.status(400).json({
      error: "interaction_mode must be either 'voice' or 'text'",
    });
    return;
  }

  // --- Insert ---
  try {
    const result = await pool.query(
      `INSERT INTO users (phone_number, preferred_language, interaction_mode)
       VALUES ($1, $2, $3)
       RETURNING id, phone_number, preferred_language, interaction_mode, created_at`,
      [phone_number.trim(), preferred_language.trim().toLowerCase(), interaction_mode]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: unknown) {
    // PostgreSQL unique violation code
    if (
      typeof err === "object" &&
      err !== null &&
      (err as { code?: string }).code === "23505"
    ) {
      res.status(409).json({
        error: "A user with this phone number already exists",
      });
      return;
    }

    console.error("[createUser] Unexpected error:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, phone_number, full_name, preferred_language, interaction_mode,
              aadhaar_verified, created_at, updated_at
       FROM users
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("[getUserById] Unexpected error:", err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}
