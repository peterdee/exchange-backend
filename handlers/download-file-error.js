import { EVENTS } from '../configuration/index.js';

/**
 * Handle 'download-file-error' event
 * @param {import('socket.io').Server} io - Socket.IO server
 * @param {*} data - necessary data for file downloading
 * @returns {boolean}
 */
export default function downloadFileError(io, data) {
  const { info = '', targetId = '' } = data;
  return io.to(targetId).emit(
    EVENTS.downloadFileError,
    { info, targetId },
  );
}
