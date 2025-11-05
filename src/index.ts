import { config } from 'dotenv';
import { join } from 'node:path';
import { stat } from 'node:fs/promises';

(async () => {
  try {
    await stat(join(process.cwd(), '.env'));
    config({ quiet: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  return import('./server');
})();
