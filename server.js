import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  EVENTS,
  PORT,
} from './configuration/index.js';
import log, { bgGreen } from './utilities/log.js';

// handlers
import downloadFile from './handlers/download-file.js';
import listFile from './handlers/list-file.js';
import requestListedFiles from './handlers/request-listed-files.js';

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
      EVENTS.downloadFile,
      (data) => downloadFile(connection, io, data),
    );
    connection.on(
      EVENTS.listFile,
      (data) => listFile(connection, data),
    );
    connection.on(
      EVENTS.requestListedFiles,
      () => requestListedFiles(connection, io),
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
