import type { Server as IOServer } from 'socket.io';

import { EVENTS } from '../configuration';
import log from '../utilities/log';

import changePassword from '../handlers/change-password';
import deleteAllFiles from '../handlers/delete-all-files';
import deleteFile from '../handlers/delete-file';
import downloadFile from '../handlers/download-file';
import listFile from '../handlers/list-file';
import removePassword from '../handlers/remove-password';
import requestFileChunk from '../handlers/request-file-chunk';
import requestGrant from '../handlers/request-grant';
import requestListedFiles from '../handlers/request-listed-files';
import requestServerConfiguration from '../handlers/request-server-configuration';
import updateDeviceName from '../handlers/update-device-name';
import uploadFileChunk from '../handlers/upload-file-chunk';

import type * as types from '../types';

export default function router(connection: types.CustomSocket, io: IOServer) {
  log('-> connected', connection.id);

  connection.on(
    EVENTS.changePassword,
    (
      data: types.ChangePassword,
      callback: (value: types.AcknowledgementMessage) => void,
    ) => changePassword(connection, data, callback),
  );

  connection.on(
    EVENTS.deleteAllFiles,
    () => deleteAllFiles(connection),
  );

  connection.on(
    EVENTS.deleteFile,
    (data: types.DeleteFile) => deleteFile(connection, data),
  );

  connection.on(
    EVENTS.downloadFile,
    (
      data: types.GenericFileData,
      callback: (value: types.AcknowledgementMessage) => void,
    ) => downloadFile(connection, io, data, callback),
  );

  connection.on(
    EVENTS.listFile,
    (data: types.ListFile) => listFile(connection, data),
  );

  connection.on(
    EVENTS.requestFileChunk,
    (data: types.GenericFileData) => removePassword(connection, data),
  );

  connection.on(
    EVENTS.requestFileChunk,
    (data: types.RequestFileChunk) => requestFileChunk(io, data),
  );

  connection.on(
    EVENTS.requestGrant,
    (
      data: types.RequestGrant,
      callback: (value: types.AcknowledgementMessage<{ grant: string } | null>) => void,
    ) => requestGrant(io, data, callback),
  );

  connection.on(
    EVENTS.requestListedFiles,
    () => requestListedFiles(connection, io),
  );

  connection.on(
    EVENTS.requestServerConfiguration,
    (
      callback: (value: types.AcknowledgementMessage<types.ServerConfiguration>) => void,
    ) => requestServerConfiguration(callback),
  );

  connection.on(
    EVENTS.updateDeviceName,
    (data: types.UpdateDeviceName) => updateDeviceName(connection, data),
  );

  connection.on(
    EVENTS.uploadFileChunk,
    (data: types.UplaodFileChunk) => uploadFileChunk(connection, io, data),
  );

  connection.on(
    EVENTS.disconnect,
    (): boolean => {
      log(`-> disconnected ${connection.id}`);
      return io.emit(EVENTS.clientDisconnect, { id: connection.id });
    },
  );
}
