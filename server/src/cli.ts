import { intro, outro, confirm, isCancel, cancel, note, spinner } from "@clack/prompts";
import { execSync } from "node:child_process";
import { getProjectConfig } from "./prompts/project.prompt.js";
import { generateProject } from "./generator/project.generator.js";

export async function startCLI() {
  try {
    intro("🚀 Welcome to create-node-server");

    const config = await getProjectConfig();
    await generateProject(config);

    note(
      [`cd ${config.projectName}`, `npm install`, `npm run dev`].join("\n"),
      "Next steps",
    );

    const shouldInstall = await confirm({
      message: "Do you want to run these commands now?",
      initialValue: true,
    });

    if (isCancel(shouldInstall)) {
      cancel("Operation cancelled.");
      outro("🎉 Project created successfully!");
      return;
    }

    if (shouldInstall) {
      const s = spinner();

      s.start("Installing dependencies...");
      execSync("npm install", {
        cwd: config.projectName,
        stdio: "inherit",
      });
      s.stop("Dependencies installed!");

      outro("🎉 Project created successfully! Starting dev server...");

      execSync("npm run dev", {
        cwd: config.projectName,
        stdio: "inherit",
      });
    } else {
      outro("🎉 Project created successfully!");
    }
  } catch (error) {
    outro(error instanceof Error ? error.message : "Something went wrong.");
  }
}
