const { ENV_SOURCE = '' } = process.env;

(async () => {
  if (ENV_SOURCE && ENV_SOURCE === 'file') {
    const { default: dotenv } = await import('dotenv');
    dotenv.config();
    console.log('Loaded environment variables from .env file');
    return import('./server');
  }
  return import('./server');
})();
