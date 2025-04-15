import ip from 'ip';
import qr from 'qrcode-terminal';

import log, { forceOutput } from './log';
import { NODE_ENV } from '../configuration';

export default function printAddress(port: number, secure: boolean) {
  const address = ip.address();
  if (address) {
    log(`Exchange server is running${secure ? ' (secure)' : ''}`);
    log(`Local address: ws${secure ? 's' : ''}://localhost:${port}`);
    const addressString = `ws${secure ? 's' : ''}://${address}:${port}`;
    log(`Network address: ${addressString}`);
    log('Network address QR code:');
    qr.generate(
      addressString,
      { small: true },
    );
  }
}
