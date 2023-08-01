import type { Server, Socket } from 'socket.io';

import type { CustomSocket, DownloadFile, ListedFile } from '../types';
import { EVENTS, MESSAGES } from '../configuration';

export default function downloadFile(
  connection: Socket,
  io: Server,
  data: DownloadFile,
): boolean {
  const { fileId = '', ownerId = '' } = data;
  if (!(fileId && ownerId)) {
    return connection.emit(
      EVENTS.downloadFileError,
      { info: MESSAGES.missingRequiredData },
    );
  }
  const [ownerEntry = null] = [...io.sockets.sockets].filter(
    (entry): boolean => entry[0] === ownerId,
  );
  if (!ownerEntry) {
    return connection.emit(
      EVENTS.downloadFileError,
      { info: MESSAGES.fileOwnerDisconnected },
    );
  }
  const owner = ownerEntry[1] as CustomSocket;
  if (!(owner.listedFiles && Array.isArray(owner.listedFiles)
    && owner.listedFiles.length > 0)) {
    return connection.emit(
      EVENTS.downloadFileError,
      { info: MESSAGES.fileNotFound },
    );
  }
  const [file = null] = owner.listedFiles.filter(
    (item: ListedFile): boolean => item.id === fileId,
  );
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
