import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/projects/${id}`)
      .then(res => res.json())
      .then(setProject);
  }, [id]);

  const generateProfile = async () => {
    const res = await fetch(`http://localhost:4000/projects/${id}/success-profile`);
    setProfile(await res.json());
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">{project.job_title}</h1>
      <p>{project.job_description}</p>
      <button onClick={generateProfile} className="mt-4 bg-green-600 text-white p-2 rounded">Generate Success Profile</button>
      {profile && (
        <pre className="mt-4 p-2 bg-gray-100">{JSON.stringify(profile, null, 2)}</pre>
      )}
    </div>
  );
}
