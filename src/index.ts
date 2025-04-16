const { ENV_FILE = '' } = process.env;

(async () => {
  if (ENV_FILE === 'true') {
    const { default: dotenv } = await import('dotenv');
    dotenv.config();
    return import('./server');
  }
  return import('./server');
})();
