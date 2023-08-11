import { createHash } from '../utilities/hash';
import type { CustomSocket, ListedFile } from '../types';
import { EVENTS } from '../configuration';

export default async function listFile(
  connection: CustomSocket,
  data: ListedFile,
): Promise<boolean> {
  if (!connection.listedFiles) {
    connection.listedFiles = [];
  }
  const grant = await createHash(`${data.id}-${connection.id}-${Date.now()}`);
  const listedFile: ListedFile = {
    ...data,
    grant,
  };
  connection.listedFiles.push(listedFile);
  return connection.broadcast.emit(
    EVENTS.listFile,
    data,
  );
}
