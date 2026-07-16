import { intro, outro } from "@clack/prompts";

import { getProjectConfig } from "./prompts/project.prompt.js";

export async function startCLI() {
  intro("🚀 Welcome to the create-node-server cli package");

  const config = await getProjectConfig();

  console.log(config);

  outro("Project configuration received!");
}
