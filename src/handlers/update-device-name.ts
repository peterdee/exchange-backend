import type { CustomSocket, ListedFile, UpdateDeviceName } from '../types';
import { EVENTS } from '../configuration';

export default function updateDeviceName(
  connection: CustomSocket,
  data: UpdateDeviceName,
): null | boolean {
  const { newDeviceName = '', ownerId = '' } = data;
  if (ownerId === connection.id && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles.forEach(
      (item: ListedFile): void => {
        item.deviceName = newDeviceName;
      },
    );
    return connection.broadcast.emit(
      EVENTS.updateDeviceName,
      data,
    );
  }
  return null;
}
