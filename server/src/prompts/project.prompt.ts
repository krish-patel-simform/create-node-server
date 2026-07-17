import { text, select, cancel, isCancel } from "@clack/prompts";
import type {
  ProjectConfig,
  Framework,
  Language,
} from "../types/project.types.js";
import { FRAMEWORK_OPTIONS, LANGUAGE_OPTIONS } from "../consts.ts";

export async function getProjectConfig(): Promise<ProjectConfig> {
  const projectName = await text({
    message: "What is your project name ?",
    placeholder: "server",
    defaultValue: "server",
    validate(value) {
      if (value && value.trim().length === 0) {
        return "Project name is required!";
      }
    },
  });

  if (isCancel(projectName)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const framework = await select({
    message: "Choose framework",

    options: FRAMEWORK_OPTIONS as any,
  });

  if (isCancel(framework)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const language = await select({
    message: "Choose language",

    options: LANGUAGE_OPTIONS as any,
  });

  if (isCancel(language)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return {
    projectName: String(projectName),
    framework: framework as Framework,
    language: language as Language,
  };
}
