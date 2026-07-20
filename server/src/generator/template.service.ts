import { cp, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export async function copyTemplate(
  souce: string,
  destination: string,
): Promise<void> {
  await cp(souce, destination, {
    recursive: true,
  });

  // npm renames .gitignore → .npmignore during publish/pack.
  // Templates store it as _gitignore; restore the correct name after copying.
  await restoreGitignore(destination);
}

async function restoreGitignore(directory: string): Promise<void> {
  const entries = await readdir(directory);

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      await restoreGitignore(fullPath);
      continue;
    }

    if (entry === "_gitignore") {
      await rename(fullPath, path.join(directory, ".gitignore"));
    }
  }
}

export async function replacePlaceholders(
  directory: string,
  variables: Record<string, string>,
): Promise<void> {
  const entries = await readdir(directory);

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);

    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      await replacePlaceholders(fullPath, variables);
      continue;
    }

    let content = await readFile(fullPath, "utf8");

    for (const [key, value] of Object.entries(variables)) {
      const placeholder = `{{${key}}}`;

      content = content.replaceAll(placeholder, value);
    }

    await writeFile(fullPath, content);
  }
}
