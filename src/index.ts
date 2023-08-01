const { ENV = '' } = process.env;

(async (): Promise<typeof import('./server')> => {
  if (!ENV || (ENV && ENV === 'file')) {
    const { default: dotenv } = await import('dotenv');
    dotenv.config();
    return import('./server');
  }
  return import('./server');
})();
