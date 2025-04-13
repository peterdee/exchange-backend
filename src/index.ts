const { ENV = '' } = process.env;

(async () => {
  if (!ENV || (ENV && ENV === 'file')) {
    const { default: dotenv } = await import('dotenv');
    dotenv.config();
    return import('./server');
  }
  return import('./server');
})();
