import { Console } from 'console';

import { ENV, ENVS } from '../configuration/index.js';

const logger = new Console(process.stdout, process.stderr);

export default function log(...values) {
  if (ENV === ENVS.file) {
    logger.log(values.join(' '));
  }
}
