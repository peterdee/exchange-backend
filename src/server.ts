import { createServer } from 'node:http';
import { Server as IOServer } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  CHUNK_SIZE_BYTES,
  EVENTS,
  NODE_ENV,
  PORT,
} from './configuration';
import type { CustomSocket } from './types';
import gracefulShutdown from './utilities/graceful-shutdown';
import router from './router';
import log from './utilities/log';

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

if (NODE_ENV === 'production') {
  process.on(
    'SIGINT',
    (signal) => gracefulShutdown(signal, io, serverInstance),
  );

  process.on(
    'SIGTERM',
    (signal) => gracefulShutdown(signal, io, serverInstance),
  );
}

serverInstance.listen(PORT, () => log(`Running on port ${PORT}`));
