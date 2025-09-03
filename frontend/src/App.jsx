import React, { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Expected an array but got:", data);
          setProjects([]);
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Job ID</th>
              <th>Job Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.job_id}</td>
                <td>{p.job_title}</td>
                <td>{p.job_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
