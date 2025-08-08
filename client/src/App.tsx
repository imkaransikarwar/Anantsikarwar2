import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Editor from "./pages/Editor";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="glass mx-auto max-w-6xl mt-4 flex items-center justify-between p-4">
          <Link to="/" className="font-bold text-neonCyan">MindForge UPSC</Link>
          <nav className="flex gap-4 text-sm text-gray-300">
            <Link to="/dashboard">Dashboard</Link>
            <a href="https://openai.com" target="_blank" rel="noreferrer">Docs</a>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:id" element={<Editor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
