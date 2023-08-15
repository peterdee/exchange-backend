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
  changePassword: 'change-password',
  clientDisconnect: 'client-disconnect',
  connect: 'connect',
  deleteAllFiles: 'delete-all-files',
  deleteFile: 'delete-file',
  disconnect: 'disconnect',
  downloadFile: 'download-file',
  downloadFileError: 'download-file-error',
  listFile: 'list-file',
  removePassword: 'remove-password',
  requestFileChunk: 'request-file-chunk',
  requestGrant: 'request-grant',
  requestListedFiles: 'request-listed-files',
  updateDeviceName: 'update-device-name',
  uploadFileChunk: 'upload-file-chunk',
};

export const MESSAGES = {
  fileNotFound: 'FILE_NOT_FOUND',
  fileOwnerDisconnected: 'FILE_OWNER_DISCONNECTED',
  invalidData: 'INVALID_DATA',
  invalidPassword: 'INVALID_PASSWORD',
  missingRequiredData: 'MISSING_REQUIRED_DATA',
  ok: 'OK',
};

export const PORT = Number(ev.PORT) || 9090;
