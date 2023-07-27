import { EVENTS } from '../configuration/index.js';

/**
 * Handle 'list-file' event
 * @param {import('socket.io').Socket} connection - socket connection
 * @param {*} data - file data
 * @returns {boolean}
 */
export default function listFile(connection, data) {
  if (!connection.listedFiles) {
    const copy = connection;
    copy.listedFiles = [];
  }
  connection.listedFiles.push(data);
  return connection.broadcast.emit(
    EVENTS.listFile,
    data,
  );
}
