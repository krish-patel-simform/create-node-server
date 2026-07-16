import { intro, outro } from "@clack/prompts";
import { getProjectConfig } from "./prompts/project.prompt.js";
import { generateProject } from "./generator/project.generator.js";

export async function startCLI() {
  try {
    intro("🚀 Welcome to create-node-server");
    const config = await getProjectConfig();
    await generateProject(config);

    outro("🎉 Project created successfully!");
  } catch (error) {
    outro(error instanceof Error ? error.message : "Something went wrong.");
  }
}
