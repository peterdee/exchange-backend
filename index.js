const { ENV = '' } = process.env;

(async () => {
  if (ENV && ENV === 'file') {
    const { default: dotenv } = await import('dotenv');
    dotenv.config();
    return import('./server.js');
  }
  return import('./server.js');
})();
