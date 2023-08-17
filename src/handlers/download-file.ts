import type { Server, Socket } from 'socket.io';

import type {
  AcknowledgementMessage,
  CustomSocket,
  DownloadFile,
  ListedFile,
} from '../types';
import { EVENTS, MESSAGES } from '../configuration';

export default async function downloadFile(
  connection: Socket,
  io: Server,
  data: DownloadFile,
  callback: (value: AcknowledgementMessage) => void,
): Promise<boolean | void> {
  const { fileId = '', ownerId = '' } = data;
  if (!(fileId && ownerId)) {
    return callback({
      info: MESSAGES.missingRequiredData,
      status: 400,
    });
  }
  const [ownerEntry = null] = [...io.sockets.sockets].filter(
    (entry): boolean => entry[0] === ownerId,
  );
  if (!ownerEntry) {
    return callback({
      info: MESSAGES.fileOwnerDisconnected,
      status: 400,
    });
  }
  const owner = ownerEntry[1] as CustomSocket;
  if (!(owner.listedFiles && Array.isArray(owner.listedFiles)
    && owner.listedFiles.length > 0)) {
    return callback({
      info: MESSAGES.fileNotFound,
      status: 400,
    });
  }
  const [file = null] = owner.listedFiles.filter(
    (item: ListedFile): boolean => item.id === fileId,
  );
  if (!file) {
    return callback({
      info: MESSAGES.fileNotFound,
      status: 400,
    });
  }
  if (file.withPassword) {
    const { grant = '' } = data;
    if (!grant) {
      return callback({
        info: MESSAGES.missingGrant,
        status: 401,
      });
    }
    if (grant !== file.grant) {
      return callback({
        info: MESSAGES.invalidGrant,
        status: 401,
      });
    }
  }
  return io.to(ownerId).emit(
    EVENTS.downloadFile,
    {
      fileId,
      targetId: connection.id,
    },
  );
}
