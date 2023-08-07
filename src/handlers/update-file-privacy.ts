import type { CustomSocket, ListedFile, UpdateFilePrivacy } from '../types';
import { EVENTS } from '../configuration';

export default function updateFilePrivacy(
  connection: CustomSocket,
  data: UpdateFilePrivacy,
): null | boolean {
  const { fileId = '', isPrivate, ownerId = '' } = data;
  if (ownerId === connection.id && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles.forEach(
      (item: ListedFile): void => {
        if (item.id === fileId) {
          item.private = isPrivate;
        }
      },
    );
    return connection.broadcast.emit(
      EVENTS.updateFilePrivacy,
      data,
    );
  }
  return null;
}
