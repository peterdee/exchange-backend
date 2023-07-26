import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  EVENTS,
  PORT,
} from './configuration/index.js';
import log, { bgGreen } from './utilities/log.js';

const httpServer = createServer();
const io = new Server(
  httpServer,
  {
    cors: {
      credentials: true,
      origin: ALLOWED_ORIGINS,
    },
    maxHttpBufferSize: 1e10,
    pingInterval: 25000,
    pingTimeout: 10000,
  },
);

io.on(
  EVENTS.connect,
  (connection) => {
    log('-> connected', connection.id);

    connection.on(
      EVENTS.listFile,
      (data) => {
        log('received data', JSON.stringify(data));
      },
    );

    connection.on(EVENTS.disconnect, () => {
      log(`-> disconnected ${connection.id}`);
    });
  },
);

httpServer.listen(
  PORT,
  () => log(bgGreen(`Server is running on port ${PORT}`)),
);
