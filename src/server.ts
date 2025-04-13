import { createServer } from 'node:http';
import { Server as IOServer } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  CHUNK_SIZE_BYTES,
  EVENTS,
  PORT,
  TYPE,
  TYPES,
} from './configuration';
import type { CustomSocket } from './types';
import gracefulShutdown from './utilities/graceful-shutdown';
import localAddress from './utilities/local-address';
import log from './utilities/log';
import router from './router';

const serverInstance = createServer();

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

serverInstance.listen(
  PORT,
  () => {
    log(`Server is running on port ${PORT}`);
    if (TYPE === TYPES.local) {
      localAddress(PORT);
    }
  },
);
