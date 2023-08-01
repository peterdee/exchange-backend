import type { CustomSocket, ListedFile } from '../types';
import { EVENTS } from '../configuration';

export default function listFile(connection: CustomSocket, data: ListedFile): boolean {
  if (!connection.listedFiles) {
    connection.listedFiles = [];
  }
  connection.listedFiles.push(data);
  return connection.broadcast.emit(
    EVENTS.listFile,
    data,
  );
}
