import type { Server } from 'socket.io';

import { EVENTS } from '../configuration';
import type { CustomSocket, ListedFile, UplaodFileChunk } from '../types';

export default function uploadFileChunk(
  connection: CustomSocket,
  io: Server,
  data: UplaodFileChunk,
): boolean {
  if (data.currentChunk === data.totalChunks) {
    const { fileId } = data;
    connection.listedFiles.forEach((item: ListedFile): void => {
      if (item.id === fileId) {
        const { totalDownloads } = item;
        item.totalDownloads += 1;
        io.emit(
          EVENTS.updateTotalDownloads,
          {
            fileId,
            totalDownloads: totalDownloads + 1,
          },
        );
      }
    });
  }
  return io.to(data.targetId).emit(
    EVENTS.uploadFileChunk,
    data,
  );
}
