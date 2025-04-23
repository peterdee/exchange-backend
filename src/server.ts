import { createServer as createHttpServer } from 'node:http';
import { createServer as createHttpsServer } from 'node:https';
import express from 'express';
import { Server as IOServer } from 'socket.io';
import ip from 'ip';
import qr from 'qrcode-terminal';
import { readFileSync } from 'node:fs';

import {
  ALLOWED_ORIGINS,
  CHUNK_SIZE_BYTES,
  EVENTS,
  IS_LOCAL,
  NODE_ENV,
  PORT,
} from './configuration';
import type { CustomSocket } from './types';
import gracefulShutdown from './utilities/graceful-shutdown';
import router from './router';
import log from './utilities/log';

const ADDRESS = ip.address();

const BACKEND_URL = `https://${ADDRESS}:${PORT}`;

// TODO: frontend URL should not be hardcoded
const FRONTEND_URL = `https://${ADDRESS}:3000`;

const allowedOrigins = [...ALLOWED_ORIGINS];
if (IS_LOCAL) {
  allowedOrigins.push(FRONTEND_URL);
}

function createServerInstance(isLocal: boolean) {
  if (!isLocal) {
    return createHttpServer();
  }

  const app = express();
  app.get('/', (_, response) => response.redirect(FRONTEND_URL));

  qr.generate(`https://${ADDRESS}:${PORT}`, { small: true });

  return createHttpsServer(
    {
      cert: readFileSync(`${process.cwd()}/certificates/cert.pem`),
      key: readFileSync(`${process.cwd()}/certificates/key.pem`),
    },
    app,
  );
}

const serverInstance = createServerInstance(IS_LOCAL);

const io = new IOServer(
  serverInstance,
  {
    cors: {
      credentials: true,
      origin: allowedOrigins,
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

serverInstance.listen(
  PORT,
  () => log(`Running on port ${PORT}${IS_LOCAL ? ` [LOCAL: ${BACKEND_URL}]` : ''}`),
);
