const { env: ev } = process;

export const ALLOWED_ORIGINS = ev.ALLOWED_ORIGINS
  ? ev.ALLOWED_ORIGINS.split(',')
  : [];

export const ENVS = {
  file: 'file',
  nofile: 'nofile',
};

export const {
  ENV = ENVS.file,
} = ev;

export const EVENTS = {
  clientDisconnect: 'client-disconnect',
  connect: 'connect',
  deleteFile: 'delete-file',
  disconnect: 'disconnect',
  downloadFile: 'download-file',
  downloadFileError: 'download-file-error',
  listFile: 'list-file',
  requestFileChunk: 'request-file-chunk',
  requestListedFiles: 'request-listed-files',
  uploadFileChunk: 'upload-file-chunk',
};

export const MESSAGES = {
  fileNotFound: 'FILE_NOT_FOUND',
  fileOwnerDisconnected: 'FILE_OWNER_DISCONNECTED',
  missingRequiredData: 'MISSING_REQUIRED_DATA',
};

export const PORT = Number(ev.PORT) || 9090;
