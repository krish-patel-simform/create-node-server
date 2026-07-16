import { text, select, cancel, isCancel } from "@clack/prompts";
import type { ProjectConfig } from "../types/project.types.js";

export async function getProjectConfig(): Promise<ProjectConfig> {
  const projectName = await text({
    message: "What is your project name ?",
    placeholder: "my-server",
  });

  if (isCancel(projectName)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const framework = await select({
    message: "Choose framework",

    options: [
      {
        value: "express",
        label: "Express",
      },
      {
        value: "fastify",
        label: "Fastify",
      },
      {
        value: "hono",
        label: "Hono",
      },
    ],
  });

  if (isCancel(framework)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const language = await select({
    message: "Choose language",

    options: [
      {
        value: "typescript",
        label: "TypeScript",
      },
      {
        value: "javascript",
        label: "JavaScript",
      },
    ],
  });

  if (isCancel(language)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return {
    projectName: String(projectName),
    framework,
    language,
  };
}
