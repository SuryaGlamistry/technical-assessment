// index.js
import express from "express";
import cors from "cors";
import knex from "knex";
import config from "./knexfile.js";

const db = knex(config.development);
const app = express();
app.use(cors());
app.use(express.json());

// POST /projects - create project
app.post("/project", async (req, res) => {
  try {
    const { jobId, jobTitle, jobDescription } = req.body;
    const [id] = await db("project").insert({ job_id: jobId, job_title: jobTitle, job_description: jobDescription });
    res.json({ id, jobId, jobTitle, jobDescription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /projects - list projects
app.get("/project", async (req, res) => {
  try {
    const projects = await db("project").select("*");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4002, () => console.log("Backend running on http://localhost:4002"));
