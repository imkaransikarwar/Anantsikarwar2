import { useParams } from "react-router-dom";

export default function Editor() {
  const { id } = useParams();
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h2 className="text-2xl font-semibold">Editor</h2>
      <p className="text-gray-400">Editing project ID: {id}</p>
      <div className="glass p-6 mt-4">Mind map canvas will go here.</div>
    </main>
  );
}