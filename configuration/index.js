const { env: ev } = process;

export const ALLOWED_ORIGINS = ev.ALLOWED_ORIGINS
  ? ev.ALLOWED_ORIGINS.split(',')
  : '';

export const ENVS = {
  file: 'file',
  nofile: 'nofile',
};

export const {
  ENV = ENVS.file,
} = ev;

export const EVENTS = {
  connect: 'connect',
  disconnect: 'disconnect',
  downloadFile: 'download-file',
  listFile: 'list-file',
  requestListedFiles: 'request-listed-files',
};

export const PORT = Number(ev.PORT) || 9090;
