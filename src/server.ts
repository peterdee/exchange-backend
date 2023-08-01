import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  ALLOWED_ORIGINS,
  EVENTS,
  PORT,
} from './configuration';
import type {
  CustomSocket,
  DownloadFile,
  DownloadFileError,
  ListedFile,
  RequestFileChunk,
  UplaodFileChunk,
} from './types';
import log, { bgGreen } from './utilities/log';

// handlers
import downloadFileError from './handlers/download-file-error';
import downloadFile from './handlers/download-file';
import listFile from './handlers/list-file';
import requestFileChunk from './handlers/request-file-chunk';
import requestListedFiles from './handlers/request-listed-files';
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
      EVENTS.uploadFileChunk,
      (data: UplaodFileChunk): boolean => uploadFileChunk(io, data),
    );

    connection.on(EVENTS.disconnect, () => {
      log(`-> disconnected ${connection.id}`);
      return io.emit(EVENTS.clientDisconnect, { id: connection.id });
    });
  },
);

httpServer.listen(
  PORT,
  (): void => log(bgGreen(`Server is running on port ${PORT}`)),
);
