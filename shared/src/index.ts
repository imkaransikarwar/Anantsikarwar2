import { z } from "zod";

export const GSPaperEnum = z.enum(["GS1", "GS2", "GS3", "GS4"]);
export type GSPaper = z.infer<typeof GSPaperEnum>;

export const CategoryEnum = z.enum([
  "History",
  "Polity",
  "Geography",
  "Economics",
  "Environment",
  "CurrentAffairs",
]);
export type Category = z.infer<typeof CategoryEnum>;

export const EdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  relation: z.string().optional(),
});
export type Edge = z.infer<typeof EdgeSchema>;

export const NodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  category: CategoryEnum,
  notes: z.string().optional(),
  examples: z.array(z.string()).optional(),
  dataPoints: z.array(z.string()).optional(),
  reports: z.array(z.string()).optional(),
  pyqRefs: z.array(z.string()).optional(),
  gsPaper: GSPaperEnum.optional(),
  color: z.string().optional(),
});
export type Node = z.infer<typeof NodeSchema>;

export const MapSchema = z.object({
  id: z.string(),
  topic: z.string(),
  gsPaper: GSPaperEnum.optional(),
  nodes: z.array(NodeSchema),
  edges: z.array(EdgeSchema),
  metadata: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    layout: z.enum(["cose", "breadthfirst", "circular", "concentric"]).optional(),
    tags: z.array(z.string()).optional(),
  }),
});
export type MindMap = z.infer<typeof MapSchema>;

export const GenerateRequestSchema = z.object({
  topic: z.string().optional(),
  text: z.string().optional(),
  gsPaper: GSPaperEnum.optional(),
});
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export const SummaryResponseSchema = z.object({ notes: z.string() });
export type SummaryResponse = z.infer<typeof SummaryResponseSchema>;

export const ProjectSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  title: z.string(),
  topic: z.string(),
  gsPaper: GSPaperEnum.optional(),
  tags: z.array(z.string()).default([]),
  map: MapSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const CATEGORY_COLORS: Record<Category, string> = {
  History: "#ff4ecd",
  Polity: "#22d3ee",
  Geography: "#8b5cf6",
  Economics: "#f59e0b",
  Environment: "#22c55e",
  CurrentAffairs: "#ef4444",
};

export function createMockMap(topic: string = "Urbanization in India"): MindMap {
  const now = new Date().toISOString();
  return {
    id: "mock-1",
    topic,
    nodes: [
      { id: "n1", label: topic, category: "Economics" },
      { id: "n2", label: "Drivers", category: "Geography", notes: "Migration, Industrialization" },
      { id: "n3", label: "Challenges", category: "Environment", notes: "Pollution, Slums" },
      { id: "n4", label: "Govt Reports", category: "Polity", reports: ["NITI Aayog", "MoHUA"], gsPaper: "GS1" },
      { id: "n5", label: "PYQs", category: "History", pyqRefs: ["2016 GS1", "2021 GS1"] },
    ],
    edges: [
      { id: "e1", source: "n1", target: "n2" },
      { id: "e2", source: "n1", target: "n3" },
      { id: "e3", source: "n1", target: "n4" },
      { id: "e4", source: "n1", target: "n5" },
    ],
    metadata: { createdAt: now, updatedAt: now, layout: "cose", tags: ["demo"] },
  };
}