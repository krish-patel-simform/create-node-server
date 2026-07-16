export type Language = "typescript" | "javascript";

export type Framework = "express" | "fastify" | "hono";

export interface ProjectConfig {
  projectName: string;

  language: Language;

  framework: Framework;
}
