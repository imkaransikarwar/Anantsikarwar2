import { useState } from "react";
import axios from "axios";

export default function Landing() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function generate() {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/maps/generate", { topic });
      setResult(res.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neonCyan to-neonPink bg-clip-text text-transparent">
          AI Mind Maps for UPSC
        </h1>
        <p className="text-gray-400 mt-2">Type a topic and generate a mock mind map (server-connected).</p>
      </div>
      <div className="glass mt-8 p-6">
        <div className="flex gap-3">
          <input
            className="flex-1 bg-black/30 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-neonCyan"
            placeholder="e.g., Urbanization in India"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={generate}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-neonPink text-black font-semibold shadow-glow disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Map"}
          </button>
        </div>
      </div>
      {result && (
        <pre className="mt-6 p-4 glass overflow-auto text-xs">{JSON.stringify(result, null, 2)}</pre>
      )}
    </main>
  );
}