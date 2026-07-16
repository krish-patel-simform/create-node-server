#!/usr/bin/env node
import { startCLI } from "./cli.js";
import {
  copyTemplate,
  replacePlaceholders,
} from "./generator/template.service.ts";

async function main() {
  await copyTemplate("templates/basic", "my-api");

  await replacePlaceholders("my-api", {
    PROJECT_NAME: "my-api",
    AUTHOR: "Krish",
  });
  //   await startCLI();
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
