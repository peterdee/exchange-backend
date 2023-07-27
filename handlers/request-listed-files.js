import { EVENTS } from '../configuration/index.js';

/**
 * Handle 'request-listed-files' event
 * @param {import('socket.io').Socket} connection - socket connection
 * @param {import('socket.io').Server} io - Socket.IO server
 * @returns {boolean}
 */
export default function requestListedFiles(connection, io) {
  const listedFiles = [];
  [...io.sockets.sockets].forEach((entry) => {
    const [, socket] = entry;
    if (socket.listedFiles && Array.isArray(socket.listedFiles)) {
      socket.listedFiles.forEach((file) => {
        if (!file.private) {
          listedFiles.push(file);
        }
      });
    }
  });
  return connection.emit(
    EVENTS.requestListedFiles,
    listedFiles,
  );
}
