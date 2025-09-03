import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, jobTitle, jobDescription })
    });
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Create Project</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input placeholder="Job ID" value={jobId} onChange={e => setJobId(e.target.value)} />
        <input placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
        <textarea placeholder="Job Description" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
        <button className="bg-blue-600 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}
