import { Console } from 'console';

import { NODE_ENV } from '../configuration';

const logger = new Console(process.stdout, process.stderr);

export default function log(...values: unknown[]) {
  if (NODE_ENV !== 'production') {
    logger.log(`[XCH ${new Date().toISOString()}] ${values.join(' ')}`);
  }
}
