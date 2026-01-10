import { log } from "../logger.js";
import { cosmiconfigSync } from "cosmiconfig";
import Ajv from "ajv";
import schema from "./schema.json" assert { type: "json" };
import betterAjvErrors from "better-ajv-errors";
const ajv = new Ajv({ jsonPointers: true });

const configLoader = cosmiconfigSync("tool");

export function getConfig() {
  const logger = log("config-mgr");

  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning("Could not find configuration, using default");
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning("Invalid configuration was supplied");
      //   console.log(ajv.errors);
      console.log();
      console.log(betterAjvErrors(schema, result.config, ajv.errors));

      process.exit(1);
    }
    logger.debug("Found configuration", result.config);
    return result.config;
  }
}
