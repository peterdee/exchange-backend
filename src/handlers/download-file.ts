import { EVENTS, MESSAGES } from '../configuration/index.js';

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
    return connection.emit(
      EVENTS.downloadFileError,
      { info: MESSAGES.missingRequiredData },
    );
  }
  const [ownerEntry = null] = [...io.sockets.sockets].filter(
    (entry) => entry[0] === ownerId,
  );
  if (!ownerEntry) {
    return connection.emit(
      EVENTS.downloadFileError,
      { info: MESSAGES.fileOwnerDisconnected },
    );
  }
  const [, owner] = ownerEntry;
  if (!(owner.listedFiles && Array.isArray(owner.listedFiles)
    && owner.listedFiles.length > 0)) {
    return connection.emit(
      EVENTS.downloadFileError,
      { info: MESSAGES.fileNotFound },
    );
  }
  const [file = null] = owner.listedFiles.filter((item) => item.id === fileId);
  if (!file) {
    return connection.emit(
      EVENTS.downloadFileError,
      { info: MESSAGES.fileNotFound },
    );
  }
  return io.to(ownerId).emit(
    EVENTS.downloadFile,
    {
      fileId,
      targetId: connection.id,
    },
  );
}
