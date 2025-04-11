const { env: ev } = process;

export const ENV_NAMES = {
  ALLOWED_ORIGINS: 'ALLOWED_ORIGINS',
  ENV: 'ENV',
  PORT: 'PORT',
  TYPE: 'TYPE',
};

export const ENVS = {
  file: 'file',
  nofile: 'nofile',
};

export const ALLOWED_ORIGINS = ev[ENV_NAMES.ALLOWED_ORIGINS]
  ? ev[ENV_NAMES.ALLOWED_ORIGINS].split(',')
  : [];

export const ENV = ev[ENV_NAMES.ENV] || ENVS.file;

export const EVENTS = {
  changePassword: 'change-password',
  clientDisconnect: 'client-disconnect',
  connect: 'connect',
  deleteAllFiles: 'delete-all-files',
  deleteFile: 'delete-file',
  disconnect: 'disconnect',
  downloadFile: 'download-file',
  listFile: 'list-file',
  removePassword: 'remove-password',
  requestFileChunk: 'request-file-chunk',
  requestGrant: 'request-grant',
  requestListedFiles: 'request-listed-files',
  updateDeviceName: 'update-device-name',
  updateTotalDownloads: 'update-total-downloads',
  uploadFileChunk: 'upload-file-chunk',
};

export const MESSAGES = {
  fileNotFound: 'FILE_NOT_FOUND',
  fileOwnerDisconnected: 'FILE_OWNER_DISCONNECTED',
  invalidData: 'INVALID_DATA',
  invalidGrant: 'INVALID_GRANT',
  invalidPassword: 'INVALID_PASSWORD',
  missingGrant: 'MISSING_GRANT',
  missingRequiredData: 'MISSING_REQUIRED_DATA',
  ok: 'OK',
};

export const PORT = Number(ev[ENV_NAMES.PORT]) || 9090;

export const TYPE = ev[ENV_NAMES.TYPE];

export const TYPES = {
  local: 'local',
};
