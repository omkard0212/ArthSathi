import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/pool";
import usersRouter from "./routes/users";
import financialProfilesRouter from "./routes/financial-profiles";
import schemesRouter from "./routes/schemes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "ArthSathi API" });
});

app.get("/api/db-health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({ status: "ok", db_time: result.rows[0].now });
  } catch (err) {
    console.error("DB health check failed:", err);
    res.status(500).json({ status: "error", message: "Database connection failed" });
  }
});

app.use("/api/users", usersRouter);
app.use("/api/financial-profiles", financialProfilesRouter);
app.use("/api/schemes", schemesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`ArthSathi API running on http://localhost:${PORT}`);
});
