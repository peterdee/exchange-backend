import type { Server } from 'socket.io';

import { EVENTS } from '../configuration';
import type * as types from '../types';

export default function uploadFileChunk(
  connection: types.CustomSocket,
  io: Server,
  data: types.UplaodFileChunk,
): boolean {
  if (data.currentChunk === data.totalChunks) {
    const { fileId } = data;
    connection.listedFiles.forEach((item: types.ListedFile): void => {
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
