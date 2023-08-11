import type { AddPassword, CustomSocket, ListedFile } from '../types';
import { createHash } from '../utilities/hash';
import { EVENTS } from '../configuration';

export default async function addPassword(
  connection: CustomSocket,
  data: AddPassword,
): Promise<boolean> {
  const { fileId = '', ownerId = '', password = '' } = data;
  const trimmedPassword = (password || '').trim();
  // TODO: ACK with error
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
  return connection.broadcast.emit(
    EVENTS.removePassword,
    {
      fileId,
      ownerId: connection.id,
    },
  );
}
