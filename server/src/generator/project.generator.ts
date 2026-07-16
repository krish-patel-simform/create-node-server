import path from "node:path";
import { access } from "node:fs/promises";
import type { ProjectConfig } from "../types/project.types.js";
import { copyTemplate, replacePlaceholders } from "./template.service.js";

async function projectExists(projectPath: string): Promise<boolean> {
  try {
    await access(projectPath);

    return true;
  } catch {
    return false;
  }
}

async function templateExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function generateProject(config: ProjectConfig): Promise<void> {
  const templatePath = path.resolve(
    import.meta.dirname,
    "../../templates",
    config.framework,
    config.language,
  );

  if (!(await templateExists(templatePath))) {
    throw new Error(
      `Template for "${config.framework}" ${config.language} not found.`,
    );
  }

  const destinationPath = path.resolve(config.projectName);
  if (await projectExists(destinationPath)) {
    throw new Error(`Project "${config.projectName}" already exists.`);
  }

  await copyTemplate(templatePath, destinationPath);

  await replacePlaceholders(destinationPath, {
    PROJECT_NAME: config.projectName,
  });
}
