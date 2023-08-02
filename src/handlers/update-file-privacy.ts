import { EVENTS } from '../configuration';
import type { CustomSocket, ListedFile, UpdateFilePrivacy } from '../types';

export default function updateFilePrivacy(
  connection: CustomSocket,
  data: UpdateFilePrivacy,
): boolean | void {
  const { fileId = '', ownerId = '' } = data;
  if (ownerId === connection.id && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles = connection.listedFiles.reduce(
      (array: ListedFile[], item: ListedFile): ListedFile[] => {
        if (item.id === fileId) {
          const updatedItem: ListedFile = {
            ...item,
            private: data.isPrivate,
          };
          array.push(updatedItem);
        } else {
          array.push(item);
        }
        return array;
      },
      [],
    );
    return connection.broadcast.emit(
      EVENTS.updateFilePrivacy,
      data,
    );
  }
}
