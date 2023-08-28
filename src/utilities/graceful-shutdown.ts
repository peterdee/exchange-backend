import type { Server as HTTPServer } from 'node:http';
import type { Server as IOServer } from 'socket.io';

import log from './log';

export default function gracefulShutdown(
  signal: string,
  io: IOServer,
  server: HTTPServer,
): void {
  server.close((serverClosingError: Error): void => {
    if (serverClosingError) {
      throw serverClosingError;
    }
    io.close();
    return log('Gracefully stopped server with signal', signal);
  });
}
