import type { CustomSocket, GenericFileData, ListedFile } from '../types';
import { EVENTS } from '../configuration';

export default function removePassword(
  connection: CustomSocket,
  data: GenericFileData,
): boolean {
  const { fileId = '', ownerId = '' } = data;
  if (connection.id === ownerId && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles.forEach(
      (item: ListedFile): void => {
        if (item.id === fileId) {
          item.passwordHash = '';
          item.withPassword = false;
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
