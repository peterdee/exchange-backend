import { createServer } from 'node:http';
import { Server as IOServer } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  EVENTS,
  PORT,
} from './configuration';
import type { CustomSocket } from './types';
import gracefulShutdown from './utilities/graceful-shutdown';
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
    maxHttpBufferSize: 1e10, // 100 MB
    pingInterval: 25000,
    pingTimeout: 10000,
  },
);

io.on(
  EVENTS.connect,
  (connection: CustomSocket): void => router(connection, io),
);

process.on(
  'SIGINT',
  (signal): void => gracefulShutdown(signal, io, serverInstance),
);

process.on(
  'SIGTERM',
  (signal): void => gracefulShutdown(signal, io, serverInstance),
);

serverInstance.listen(
  PORT,
  (): void => log(`Server is running on port ${PORT}`),
);
