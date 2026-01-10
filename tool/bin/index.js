#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";
import { log } from "../src/logger.js";
import { getConfig } from "../src/config/config-mgr.js";
import { start } from "../src/commands/start.js";

const logger = log("index");
try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });
  logger.debug("Received args", args);

  if (args["--start"]) {
    const config = getConfig();
    start(config);
    ß;
  }
} catch (e) {
  logger.warning(e.message);
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
}
