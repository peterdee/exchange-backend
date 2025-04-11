import { networkInterfaces, platform } from 'node:os';
import qr from 'qrcode-terminal';

import log from './log';

export default function localAddress(port: number) {
  let address = '';
  let infoPath = '';
  const serverPlatform = platform();
  if (serverPlatform === 'darwin') {
    infoPath = 'en0';
  }
  if (serverPlatform === 'win32') {
    infoPath = 'eth0';
  }
  if (infoPath) {
    const infoArray = networkInterfaces()[infoPath];
    if (Array.isArray(infoArray) && infoArray.length > 0) {
      for (let i = 0; i < infoArray.length; i += 1) {
        const info = infoArray[i];
        if (info.family === 'IPv4') {
          address = info.address;
          break;
        }
      }
    }
  }
  if (localAddress) {
    log(`Server address in the local network: ws://${address}:${port}`);
    qr.generate(
      `ws://${address}:${port}`,
      { small: true },
    );
  }
}
