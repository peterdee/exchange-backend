const { env: ev } = process;

export const ENVS = {
  file: 'file',
  nofile: 'nofile',
};

export const {
  ENV = ENVS.file,
} = ev;

export const PORT = Number(ev.PORT) || 9090;
