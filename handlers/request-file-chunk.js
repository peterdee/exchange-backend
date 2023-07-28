import { EVENTS } from '../configuration/index.js';

/**
 * Handle 'request-file-chunk' event
 * @param {import('socket.io').Socket} connection - socket connection
 * @param {import('socket.io').Server} io - Socket.IO server
 * @returns {boolean}
 */
export default function requestFileChunk(io, data) {
  const { ownerId } = data;
  return io.to(ownerId).emit(
    EVENTS.requestFileChunk,
    data,
  );
}
