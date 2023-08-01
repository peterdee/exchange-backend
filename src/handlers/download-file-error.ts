import type { Server } from 'socket.io';

import type { DownloadFileError } from '../types';
import { EVENTS } from '../configuration';

export default function downloadFileError(io: Server, data: DownloadFileError): boolean {
  return io.to(data.targetId).emit(
    EVENTS.downloadFileError,
    data,
  );
}
