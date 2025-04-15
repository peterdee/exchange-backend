import { createServer as createHttpServer } from 'node:http';
import { createServer as createHttpsServer } from 'node:https';
import ip from 'ip';
import { readFileSync } from 'node:fs';
import { Server as IOServer } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  CHUNK_SIZE_BYTES,
  EVENTS,
  MODE,
  PORT,
  USE_HTTPS,
} from './configuration';
import type { CustomSocket } from './types';
import gracefulShutdown from './utilities/graceful-shutdown';
import printAddress from './utilities/print-address';
import router from './router';

const serverInstance = USE_HTTPS
  ? createHttpsServer({
    cert: readFileSync('./certificates/cert.pem'),
    key: readFileSync('./certificates/key.pem'),
  })
  : createHttpServer();

if (MODE === 'local') {
  ALLOWED_ORIGINS.push(`https://${ip.address()}:3000`);
}

console.log(ALLOWED_ORIGINS);
const io = new IOServer(
  serverInstance,
  {
    cors: {
      credentials: true,
      origin: ALLOWED_ORIGINS,
    },
    maxHttpBufferSize: CHUNK_SIZE_BYTES * 2,
    pingInterval: 25000,
    pingTimeout: 10000,
  },
);

io.on(
  EVENTS.connect,
  (connection: CustomSocket) => router(connection, io),
);

process.on(
  'SIGINT',
  (signal) => gracefulShutdown(signal, io, serverInstance),
);

process.on(
  'SIGTERM',
  (signal) => gracefulShutdown(signal, io, serverInstance),
);

serverInstance.listen(PORT, () => printAddress(PORT, USE_HTTPS));
