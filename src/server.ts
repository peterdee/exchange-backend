import { createServer } from 'http';
import { Server } from 'socket.io';

import type {
  AcknowledgementMessage,
  ChangePassword,
  CustomSocket,
  DeleteFile,
  DownloadFileError,
  GenericFileData,
  ListedFile,
  RequestFileChunk,
  RequestGrant,
  UpdateDeviceName,
  UplaodFileChunk,
} from './types';
import {
  ALLOWED_ORIGINS,
  EVENTS,
  PORT,
} from './configuration';
import log from './utilities/log';

// handlers
import changePassword from './handlers/change-password';
import deleteAllFiles from './handlers/delete-all-files';
import deleteFile from './handlers/delete-file';
import downloadFileError from './handlers/download-file-error';
import downloadFile from './handlers/download-file';
import listFile from './handlers/list-file';
import removePassword from './handlers/remove-password';
import requestFileChunk from './handlers/request-file-chunk';
import requestGrant from './handlers/request-grant';
import requestListedFiles from './handlers/request-listed-files';
import updateDeviceName from './handlers/update-device-name';
import uploadFileChunk from './handlers/upload-file-chunk';

const httpServer = createServer();
const io = new Server(
  httpServer,
  {
    cors: {
      credentials: true,
      origin: ALLOWED_ORIGINS,
    },
    maxHttpBufferSize: 1e10, // 100 MB
    pingInterval: 25000,
    pingTimeout: 10000,
  },
);

io.on(
  EVENTS.connect,
  (connection: CustomSocket): void => {
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
      (data: GenericFileData): boolean => downloadFile(connection, io, data),
    );
    connection.on(
      EVENTS.downloadFileError,
      (data: DownloadFileError): boolean => downloadFileError(io, data),
    );
    connection.on(
      EVENTS.listFile,
      (data: ListedFile): Promise<boolean> => listFile(connection, data),
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
      ): Promise<void> => requestGrant(connection, io, data, callback),
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
      (data: UplaodFileChunk): boolean => uploadFileChunk(io, data),
    );

    connection.on(
      EVENTS.disconnect,
      (): boolean => {
        log(`-> disconnected ${connection.id}`);
        return io.emit(EVENTS.clientDisconnect, { id: connection.id });
      },
    );
  },
);

httpServer.listen(
  PORT,
  (): void => log(`Server is running on port ${PORT}`),
);
