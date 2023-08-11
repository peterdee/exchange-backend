import type { Socket } from 'socket.io';

export interface ListedFile {
  createdAt: number;
  deviceName: string;
  grant: string;
  id: string;
  name: string;
  ownerId: string;
  passwordHash: string;
  size: number;
  withPassword: boolean;
}

export interface CustomSocket extends Socket {
  listedFiles: ListedFile[];
}

export interface DeleteFile {
  fileId: string;
}

export interface DownloadFile {
  fileId: string;
  ownerId: string;
}

export interface DownloadFileError {
  info: string;
  targetId: string;
}

export interface RemovePassword {
  fileId: string;
  ownerId: string;
}

export interface AddPassword extends RemovePassword {
  password: string;
}

export interface RequestFileChunk {
  chunkIndex: number;
  fileId: string;
  ownerId: string;
  targetId: string;
}

export interface UpdateDeviceName {
  newDeviceName: string;
  ownerId: string;
}

export interface UplaodFileChunk {
  chunk: string;
  currentChunk: number;
  fileId: string;
  fileName: string;
  fileSize: number;
  ownerId: string;
  targetId: string;
  totalChunks: number;
  type: string;
}
