import type { Server } from 'socket.io';

import { EVENTS } from '../configuration';
import type { UplaodFileChunk } from '../types';

export default function uploadFileChunk(io: Server, data: UplaodFileChunk): boolean {
  return io.to(data.targetId).emit(
    EVENTS.uploadFileChunk,
    data,
  );
}
