import { Console } from 'console';

import { NODE_ENV } from '../configuration';

const logger = new Console(process.stdout, process.stderr);

export const forceOutput = {
  enabled: false,
};

export default function log(...values: unknown[]) {
  if (NODE_ENV !== 'production' && !forceOutput.enabled) {
    logger.log(`[XCH ${Date.now()}] ${values.join(' ')}`);
  }
}
