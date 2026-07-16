import { text } from "@clack/prompts";
import type { ProjectConfig } from "../types/project.types.js";

export async function getProjectConfig(): Promise<ProjectConfig> {
  const projectName = await text({
    message: "What is your project name ?",
    placeholder: "my-server",
  });

  return {
    projectName: String(projectName),
  };
}
