import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

// Start server
app.listen(PORT, () => {
  console.log(`ArthSathi API running on http://localhost:${PORT}`);
});
