import { EVENTS } from '../configuration';
import type * as types from '../types';

export default function removePassword(
  connection: types.CustomSocket,
  data: types.GenericFileData,
) {
  const { fileId = '', ownerId = '' } = data;
  if (connection.id === ownerId && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles.forEach(
      (item: types.ListedFile) => {
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
