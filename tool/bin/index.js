#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";
import { pkgUpSync } from "pkg-up";
import fs from "fs";

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  if (args["--start"]) {
    const pkgPath = pkgUpSync({ cwd: process.cwd() });

    if (!pkgPath) {
      console.log(chalk.yellow("No package.json found, using defaults"));
      console.log(chalk.bgCyanBright("starting the app"));
      process.exit(0);
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    if (pkg.tool) {
      console.log("Found configuration", pkg.tool);
    } else {
      console.log(chalk.yellow("Could not find configuration, using default"));
    }

    console.log(chalk.bgCyanBright("starting the app"));
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
  ${chalk.greenBright("--start")}\tStarts the app
  ${chalk.greenBright("--build")}\tBuilds the app`);
}
