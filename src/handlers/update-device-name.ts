import { EVENTS } from '../configuration';
import type * as types from '../types';

export default function updateDeviceName(
  connection: types.CustomSocket,
  data: types.UpdateDeviceName,
) {
  const { newDeviceName = '', ownerId = '' } = data;
  if (ownerId === connection.id && connection.listedFiles
    && Array.isArray(connection.listedFiles)) {
    connection.listedFiles.forEach(
      (item: types.ListedFile) => {
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
