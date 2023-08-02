import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  EVENTS,
  PORT,
} from './configuration';
import type {
  CustomSocket,
  DeleteFile,
  DownloadFile,
  DownloadFileError,
  ListedFile,
  RequestFileChunk,
  UpdateFilePrivacy,
  UplaodFileChunk,
} from './types';
import log from './utilities/log';

// handlers
import deleteFile from './handlers/delete-file';
import downloadFileError from './handlers/download-file-error';
import downloadFile from './handlers/download-file';
import listFile from './handlers/list-file';
import requestFileChunk from './handlers/request-file-chunk';
import requestListedFiles from './handlers/request-listed-files';
import updateFilePrivacy from './handlers/update-file-privacy';
import uploadFileChunk from './handlers/upload-file-chunk';

const httpServer = createServer();
const io = new Server(
  httpServer,
  {
    cors: {
      credentials: true,
      origin: ALLOWED_ORIGINS,
    },
    maxHttpBufferSize: 1e10,
    pingInterval: 25000,
    pingTimeout: 10000,
  },
);

io.on(
  EVENTS.connect,
  (connection: CustomSocket): void => {
    log('-> connected', connection.id);

    connection.on(
      EVENTS.deleteFile,
      (data: DeleteFile): boolean => deleteFile(connection, data),
    );
    connection.on(
      EVENTS.downloadFile,
      (data: DownloadFile): boolean => downloadFile(connection, io, data),
    );
    connection.on(
      EVENTS.downloadFileError,
      (data: DownloadFileError): boolean => downloadFileError(io, data),
    );
    connection.on(
      EVENTS.listFile,
      (data: ListedFile): boolean => listFile(connection, data),
    );
    connection.on(
      EVENTS.requestFileChunk,
      (data: RequestFileChunk): boolean => requestFileChunk(io, data),
    );
    connection.on(
      EVENTS.requestListedFiles,
      (): boolean => requestListedFiles(connection, io),
    );
    connection.on(
      EVENTS.updateFilePrivacy,
      (data: UpdateFilePrivacy): boolean | void => updateFilePrivacy(connection, data),
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
