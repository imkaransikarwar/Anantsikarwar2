import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects").then((r) => setProjects(r.data));
  }, []);
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h2 className="text-2xl font-semibold">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {projects.map((p) => (
          <div key={p._id} className="glass p-4">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-400">{p.topic}</div>
          </div>
        ))}
      </div>
      {projects.length === 0 && (
        <div className="text-gray-400 mt-4">No projects yet. Generate a map on the home page and save it later.</div>
      )}
    </main>
  );
}