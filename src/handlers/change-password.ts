import type {
  AcknowledgementMessage,
  ChangePassword,
  CustomSocket,
  ListedFile,
} from '../types';
import { createHash } from '../utilities/hash';
import { EVENTS, MESSAGES } from '../configuration';

export default async function changePassword(
  connection: CustomSocket,
  data: ChangePassword,
  callback: (value: AcknowledgementMessage) => void,
): Promise<void | boolean> {
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
      (item: ListedFile): void => {
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
