import { EVENTS } from '../configuration/index.js';

/**
 * Handle 'download-file' event
 * @param {import('socket.io').Socket} connection - socket connection
 * @param {import('socket.io').Server} io - Socket.IO server
 * @param {*} data - necessary data for file downloading
 * @returns {boolean}
 */
export default function downloadFile(connection, io, data) {
  const { fileId = '', ownerId = '' } = data;
  if (!(fileId && ownerId)) {
    // TODO: return error to the current connection
  }
  const [owner = null] = [...io.sockets.sockets].filter((entry) => entry[0] === ownerId);
  if (!owner) {
    // TODO: return error to the current connection
  }
  if (!(owner.listedFiles && Array.isArray(owner.listedFiles) && owner.listedFiles.length > 0)) {
    // TODO: return error to the current connection
  }
  const [file = null] = owner.listedFiles.filter((item) => item.id === fileId);
  if (!file) {
    // TODO: return error to the current connection
  }

  // TODO: send request to the file owner
  return connection.broadcast.emit(
    EVENTS.listFile,
    data,
  );
}
