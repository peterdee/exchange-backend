import {
  CHUNK_SIZE_BYTES,
  MAX_FILE_SIZE_BYTES,
  MESSAGES,
} from '../configuration';
import type * as types from '../types';

export default function requestServerConfiguration(
  callback: (value: types.AcknowledgementMessage<types.ServerConfiguration>) => void,
) {
  return callback({
    data: {
      chunkSizeBytes: CHUNK_SIZE_BYTES,
      maxFileSizeBytes: MAX_FILE_SIZE_BYTES,
    },
    info: MESSAGES.ok,
    status: 200,
  });
}
