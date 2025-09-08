import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4002/project")
      .then(res => res.json())
      .then(setProjects);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Projects</h1>
      <ul>
        {projects.map(p => (
          <li key={p.id} className="mb-2">
            <Link to={`/project/${p.id}`} className="text-blue-600">{p.job_title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
