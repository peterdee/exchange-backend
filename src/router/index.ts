import type { Server as IOServer } from 'socket.io';

import type {
  AcknowledgementMessage,
  ChangePassword,
  CustomSocket,
  DeleteFile,
  GenericFileData,
  ListFile,
  RequestFileChunk,
  RequestGrant,
  UpdateDeviceName,
  UplaodFileChunk,
} from '../types';
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
import updateDeviceName from '../handlers/update-device-name';
import uploadFileChunk from '../handlers/upload-file-chunk';

export default function router(connection: CustomSocket, io: IOServer): void {
  log('-> connected', connection.id);

  connection.on(
    EVENTS.changePassword,
    (
      data: ChangePassword,
      callback: (value: AcknowledgementMessage) => void,
    ): Promise<boolean | void> => changePassword(connection, data, callback),
  );

  connection.on(
    EVENTS.deleteAllFiles,
    (): boolean => deleteAllFiles(connection),
  );

  connection.on(
    EVENTS.deleteFile,
    (data: DeleteFile): boolean => deleteFile(connection, data),
  );

  connection.on(
    EVENTS.downloadFile,
    (
      data: GenericFileData,
      callback: (value: AcknowledgementMessage) => void,
    ): Promise<boolean | void> => downloadFile(connection, io, data, callback),
  );

  connection.on(
    EVENTS.listFile,
    (data: ListFile): Promise<boolean> => listFile(connection, data),
  );

  connection.on(
    EVENTS.requestFileChunk,
    (data: GenericFileData): boolean => removePassword(connection, data),
  );

  connection.on(
    EVENTS.requestFileChunk,
    (data: RequestFileChunk): boolean => requestFileChunk(io, data),
  );

  connection.on(
    EVENTS.requestGrant,
    (
      data: RequestGrant,
      callback: (value: AcknowledgementMessage<{ grant: string } | null>) => void,
    ): Promise<void> => requestGrant(io, data, callback),
  );

  connection.on(
    EVENTS.requestListedFiles,
    (): boolean => requestListedFiles(connection, io),
  );

  connection.on(
    EVENTS.updateDeviceName,
    (data: UpdateDeviceName): null | boolean => updateDeviceName(connection, data),
  );

  connection.on(
    EVENTS.uploadFileChunk,
    (data: UplaodFileChunk): boolean => uploadFileChunk(connection, io, data),
  );

  connection.on(
    EVENTS.disconnect,
    (): boolean => {
      log(`-> disconnected ${connection.id}`);
      return io.emit(EVENTS.clientDisconnect, { id: connection.id });
    },
  );
}
