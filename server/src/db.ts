import mongoose from "mongoose";

const projects: any[] = [];

export async function connectMongoIfAvailable(uri?: string) {
  if (!uri) {
    return { connected: false } as const;
  }
  try {
    await mongoose.connect(uri);
    return { connected: true } as const;
  } catch (err) {
    return { connected: false } as const;
  }
}

export function memoryDb() {
  return {
    projects,
  };
}