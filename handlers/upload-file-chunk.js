import { EVENTS } from '../configuration/index.js';

/**
 * Handle 'download-file' event
 * @param {import('socket.io').Socket} connection - socket connection
 * @param {import('socket.io').Server} io - Socket.IO server
 * @param {*} data - necessary data for file downloading
 * @returns {boolean}
 */
export default function uploadFileChunk(io, data) {
  const { targetId } = data;
  return io.to(targetId).emit(
    EVENTS.uploadFileChunk,
    data,
  );
}
