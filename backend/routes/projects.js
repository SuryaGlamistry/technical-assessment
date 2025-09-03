import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { jobId, jobTitle, jobDescription } = req.body;
  if (!jobTitle || !jobDescription) {
    return res.status(400).json({ error: "jobTitle and jobDescription required" });
  }

  try {
    const [id] = await db("projects").insert({
      job_id: jobId,
      job_title: jobTitle,
      job_description: jobDescription,
    });
    res.status(201).json({ id, message: "Project created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await db("projects").where({ id: req.params.id }).first();
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id/success-profile", async (req, res) => {
  try {
    const project = await db("projects").where({ id: req.params.id }).first();
    if (!project) return res.status(404).json({ error: "Not found" });

    const { job_title, job_description } = project;
    const desc = job_description?.toLowerCase() || "";

    const keySkills = [];
    if (desc.includes("sql")) keySkills.push("SQL");
    if (desc.includes("react")) keySkills.push("React");
    if (desc.includes("node")) keySkills.push("Node.js");

    const profile = {
      successSummary: `Ideal candidate for ${job_title}`,
      keySkills,
      keyCompetencies: ["Problem-Solving", "Collaboration", "Adaptability"],
      experienceAttributes: ["3-5 years relevant experience", "Exposure to modern stack"]
    };

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
