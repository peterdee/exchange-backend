import type { CustomSocket, ListedFile, RemovePassword } from '../types';
import { EVENTS } from '../configuration';

export default function removePassword(
  connection: CustomSocket,
  data: RemovePassword,
): boolean {
  const { fileId = '', ownerId = '' } = data;
  if (connection.id === ownerId && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles = connection.listedFiles.map(
      (item: ListedFile): ListedFile => {
        if (item.id === fileId) {
          return {
            ...item,
            passwordHash: '',
            withPassword: false,
          };
        }
        return item;
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
