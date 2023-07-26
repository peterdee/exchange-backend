import chalk from 'chalk';
import { Console } from 'console';

import { ENV, ENVS } from '../configuration/index.js';

const logger = new Console(process.stdout, process.stderr);

export const bgGreen = chalk.bgGreenBright;
export const red = chalk.redBright;

export default function log(...values) {
  if (ENV === ENVS.file) {
    logger.log(`${chalk.magentaBright(`[XCH ${Date.now()}]`)} ${values.join(' ')}`);
  }
}
