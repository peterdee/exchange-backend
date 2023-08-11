import type { Server } from 'socket.io';

import type { CustomSocket, ListedFile } from '../types';
import { EVENTS } from '../configuration';

export default function requestListedFiles(connection: CustomSocket, io: Server): boolean {
  const listedFiles: ListedFile[] = [];
  [...io.sockets.sockets].forEach((entry: [id: string, socket: CustomSocket]): void => {
    const [, socket] = entry;
    if (socket.listedFiles && Array.isArray(socket.listedFiles)) {
      socket.listedFiles.forEach((file: ListedFile): void => {
        listedFiles.push({
          ...file,
          grant: '',
          passwordHash: '',
        });
      });
    }
  });
  return connection.emit(
    EVENTS.requestListedFiles,
    listedFiles,
  );
}
