#!/usr/bin/env node
import { startCLI } from "./cli.js";

async function main() {
  await startCLI();
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
