import { createServer } from 'http';
import { Server } from 'socket.io';

import log from './utilities/log.js';
import { PORT } from './configuration/index.js';

const httpServer = createServer();
const io = new Server(
  httpServer,
  {
    maxHttpBufferSize: 1e10,
    pingInterval: 25000,
    pingTimeout: 10000,
    serveClient: false,
  },
);

io.on('connect', (connection) => {
  log(' -> connected', connection.id);
  connection.on('disconnect', () => {
    log(' -> disconnected', connection.id);
  });
});

httpServer.listen(
  PORT,
  () => log('EXCH server is running on port', PORT),
);
