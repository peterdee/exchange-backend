import { Console } from 'console';

import { ENV, ENVS } from '../configuration/index.js';

const logger = new Console(process.stdout, process.stderr);

export default function log(...values: unknown[]): void {
  if (ENV === ENVS.file) {
    logger.log(`[XCH ${Date.now()}] ${values.join(' ')}`);
  }
}
