import { Router } from "express";
import { z } from "zod";
import { GenerateRequestSchema, MapSchema, ProjectSchema, createMockMap } from "@shared/types";
import { randomUUID } from "crypto";

const router = Router();

// Health
router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// In-memory projects store for MVP
const projects: any[] = [];

// Generate mind map (mock if no OPENAI_API_KEY)
router.post("/maps/generate", (req, res) => {
  const parsed = GenerateRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { topic, text } = parsed.data;
  const map = createMockMap(topic || text?.slice(0, 32) || "UPSC Topic");
  return res.json(map);
});

// Projects CRUD (MVP: in-memory)
router.post("/projects", (req, res) => {
  const body = req.body;
  const now = new Date().toISOString();
  const project = {
    _id: randomUUID(),
    userId: body.userId || "guest",
    title: body.title || body.topic || "Untitled",
    topic: body.topic || "Topic",
    gsPaper: body.gsPaper,
    tags: body.tags || [],
    map: body.map,
    createdAt: now,
    updatedAt: now,
  };
  const check = ProjectSchema.safeParse(project);
  if (!check.success) {
    return res.status(400).json({ error: check.error.flatten() });
  }
  projects.push(project);
  res.json(project);
});

router.get("/projects", (_req, res) => {
  res.json(projects);
});

router.get("/projects/:id", (req, res) => {
  const p = projects.find((x) => x._id === req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

router.put("/projects/:id", (req, res) => {
  const idx = projects.findIndex((x) => x._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  projects[idx] = { ...projects[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json(projects[idx]);
});

router.delete("/projects/:id", (req, res) => {
  const idx = projects.findIndex((x) => x._id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const [removed] = projects.splice(idx, 1);
  res.json(removed);
});

// Summarize (stub)
router.post("/maps/:id/summarize", (_req, res) => {
  res.json({ notes: "Summary will appear here in a future version." });
});

export default router;