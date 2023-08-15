import type { Server } from 'socket.io';

import type {
  AcknowledgementMessage,
  CustomSocket,
  ListedFile,
  RequestGrant,
} from '../types';
import { compareHashWithPlaintext } from '../utilities/hash';
import { MESSAGES } from '../configuration';

export default async function requestGrant(
  connection: CustomSocket,
  io: Server,
  data: RequestGrant,
  callback: (value: AcknowledgementMessage<{ grant: string } | null>) => void,
): Promise<void> {
  const {
    fileId = '',
    ownerId = '',
    password = '',
  } = data;
  const trimmedPassword = (password || '').trim();
  if (!trimmedPassword) {
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
      info: MESSAGES.invalidData,
      status: 400,
    });
  }
  const owner = ownerEntry[1] as CustomSocket;
  if (!(owner.listedFiles && Array.isArray(owner.listedFiles)
    && owner.listedFiles.length > 0)) {
    return callback({
      info: MESSAGES.fileOwnerDisconnected,
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
  const passwordIsCorrect = await compareHashWithPlaintext(file.passwordHash, password);
  if (!passwordIsCorrect) {
    return callback({
      info: MESSAGES.invalidPassword,
      status: 401,
    });
  }
  return callback({
    data: {
      grant: file.grant,
    },
    info: MESSAGES.ok,
    status: 200,
  });
}
