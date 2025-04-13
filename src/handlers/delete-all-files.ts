import type { CustomSocket } from '../types';
import { EVENTS } from '../configuration';

export default function deleteAllFiles(connection: CustomSocket) {
  connection.listedFiles = [];
  return connection.broadcast.emit(
    EVENTS.deleteAllFiles,
    { ownerId: connection.id },
  );
}
