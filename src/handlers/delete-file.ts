import { EVENTS } from '../configuration';
import type * as types from '../types';

export default function deleteFile(
  connection: types.CustomSocket,
  data: types.DeleteFile,
) {
  const { fileId = '' } = data;
  if (connection.listedFiles && Array.isArray(connection.listedFiles)) {
    connection.listedFiles = connection.listedFiles.filter(
      (item: types.ListedFile) => item.id !== fileId,
    );
  }
  return connection.broadcast.emit(
    EVENTS.deleteFile,
    { fileId },
  );
}
