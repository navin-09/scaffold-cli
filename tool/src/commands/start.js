import {log} from "../logger.js";

export function start(config) {
  const logger = log("start");
  logger.highlight("  Starting the app  ");
  logger.debug("Received configuration in start -", config);
}
