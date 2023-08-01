import type { CustomSocket, DeleteFile, ListedFile } from '../types';
import { EVENTS } from '../configuration';

export default function deleteFile(
  connection: CustomSocket,
  data: DeleteFile,
): boolean {
  const { fileId = '' } = data;
  if (connection.listedFiles && Array.isArray(connection.listedFiles)) {
    connection.listedFiles = connection.listedFiles.filter(
      (item: ListedFile): boolean => item.id !== fileId,
    );
  }
  return connection.broadcast.emit(
    EVENTS.deleteFile,
    { fileId },
  );
}
