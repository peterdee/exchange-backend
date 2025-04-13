import { createHash } from '../utilities/hash';
import { EVENTS } from '../configuration';
import type * as types from '../types';

export default async function listFile(
  connection: types.CustomSocket,
  data: types.ListFile,
) {
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
  const listedFile: types.ListedFile = {
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
