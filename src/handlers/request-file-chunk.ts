import type { Server } from 'socket.io';

import { EVENTS } from '../configuration';
import type { RequestFileChunk } from '../types';

export default function requestFileChunk(io: Server, data: RequestFileChunk): boolean {
  return io.to(data.ownerId).emit(
    EVENTS.requestFileChunk,
    data,
  );
}
