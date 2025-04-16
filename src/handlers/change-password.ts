import { createHash } from '../utilities/hash';
import { EVENTS, MESSAGES } from '../configuration';
import type * as types from '../types';

export default async function changePassword(
  connection: types.CustomSocket,
  data: types.ChangePassword,
  callback: (value: types.AcknowledgementMessage) => void,
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
  const hashed = await createHash(trimmedPassword);
  if (connection.id === ownerId && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles.forEach(
      (item: types.ListedFile) => {
        if (item.id === fileId) {
          item.passwordHash = hashed;
          item.withPassword = true;
        }
      },
    );
  }
  connection.broadcast.emit(
    EVENTS.changePassword,
    {
      fileId,
      ownerId: connection.id,
    },
  );
  return callback({
    info: MESSAGES.ok,
    status: 200,
  });
}
