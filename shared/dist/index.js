"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_COLORS = exports.ProjectSchema = exports.SummaryResponseSchema = exports.GenerateRequestSchema = exports.MapSchema = exports.NodeSchema = exports.EdgeSchema = exports.CategoryEnum = exports.GSPaperEnum = void 0;
exports.createMockMap = createMockMap;
const zod_1 = require("zod");
exports.GSPaperEnum = zod_1.z.enum(["GS1", "GS2", "GS3", "GS4"]);
exports.CategoryEnum = zod_1.z.enum([
    "History",
    "Polity",
    "Geography",
    "Economics",
    "Environment",
    "CurrentAffairs",
]);
exports.EdgeSchema = zod_1.z.object({
    id: zod_1.z.string(),
    source: zod_1.z.string(),
    target: zod_1.z.string(),
    relation: zod_1.z.string().optional(),
});
exports.NodeSchema = zod_1.z.object({
    id: zod_1.z.string(),
    label: zod_1.z.string(),
    category: exports.CategoryEnum,
    notes: zod_1.z.string().optional(),
    examples: zod_1.z.array(zod_1.z.string()).optional(),
    dataPoints: zod_1.z.array(zod_1.z.string()).optional(),
    reports: zod_1.z.array(zod_1.z.string()).optional(),
    pyqRefs: zod_1.z.array(zod_1.z.string()).optional(),
    gsPaper: exports.GSPaperEnum.optional(),
    color: zod_1.z.string().optional(),
});
exports.MapSchema = zod_1.z.object({
    id: zod_1.z.string(),
    topic: zod_1.z.string(),
    gsPaper: exports.GSPaperEnum.optional(),
    nodes: zod_1.z.array(exports.NodeSchema),
    edges: zod_1.z.array(exports.EdgeSchema),
    metadata: zod_1.z.object({
        createdAt: zod_1.z.string(),
        updatedAt: zod_1.z.string(),
        layout: zod_1.z.enum(["cose", "breadthfirst", "circular", "concentric"]).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.GenerateRequestSchema = zod_1.z.object({
    topic: zod_1.z.string().optional(),
    text: zod_1.z.string().optional(),
    gsPaper: exports.GSPaperEnum.optional(),
});
exports.SummaryResponseSchema = zod_1.z.object({ notes: zod_1.z.string() });
exports.ProjectSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    userId: zod_1.z.string(),
    title: zod_1.z.string(),
    topic: zod_1.z.string(),
    gsPaper: exports.GSPaperEnum.optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    map: exports.MapSchema,
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.CATEGORY_COLORS = {
    History: "#ff4ecd",
    Polity: "#22d3ee",
    Geography: "#8b5cf6",
    Economics: "#f59e0b",
    Environment: "#22c55e",
    CurrentAffairs: "#ef4444",
};
function createMockMap(topic = "Urbanization in India") {
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
