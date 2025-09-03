import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/hiring-ratio", async (req, res) => {
  try {
    const results = await db("applications")
      .select("project_id")
      .count("id as total_applied")
      .sum(db.raw("CASE WHEN status = 'hired' THEN 1 ELSE 0 END as total_hired"))
      .groupBy("project_id");

    const formatted = results.map(r => ({
      project_id: r.project_id,
      total_applied: r.total_applied,
      total_hired: r.total_hired,
      hiring_ratio: r.total_applied > 0 ? (r.total_hired / r.total_applied).toFixed(2) : 0
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
