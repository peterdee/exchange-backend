import type { Server } from 'socket.io';

import { compareHashWithPlaintext } from '../utilities/hash';
import { MESSAGES } from '../configuration';
import type * as types from '../types';

export default async function requestGrant(
  io: Server,
  data: types.RequestGrant,
  callback: (value: types.AcknowledgementMessage<{ grant: string } | null>) => void,
) {
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
  const [ownerEntry = null] = [...io.sockets.sockets].filter((entry) => entry[0] === ownerId);
  if (!ownerEntry) {
    return callback({
      info: MESSAGES.invalidData,
      status: 400,
    });
  }
  const owner = ownerEntry[1] as types.CustomSocket;
  if (!(owner.listedFiles && Array.isArray(owner.listedFiles)
    && owner.listedFiles.length > 0)) {
    return callback({
      info: MESSAGES.fileOwnerDisconnected,
      status: 400,
    });
  }
  const [file = null] = owner.listedFiles.filter((item: types.ListedFile) => item.id === fileId);
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
