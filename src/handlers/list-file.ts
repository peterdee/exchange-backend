import { createHash } from '../utilities/hash';
import type { CustomSocket, ListFile, ListedFile } from '../types';
import { EVENTS } from '../configuration';

export default async function listFile(
  connection: CustomSocket,
  data: ListFile,
): Promise<boolean> {
  if (!connection.listedFiles) {
    connection.listedFiles = [];
  }
  const grant = await createHash(`${data.id}-${connection.id}-${Date.now()}`);
  let passwordHash = '';
  if (!!data.password && data.withPassword) {
    passwordHash = await createHash(data.password);
    data.password = '';
  }
  data.totalDownloads = 0;
  const listedFile: ListedFile = {
    ...data,
    grant,
    passwordHash,
  };
  connection.listedFiles.push(listedFile);
  return connection.broadcast.emit(
    EVENTS.listFile,
    data,
  );
}
