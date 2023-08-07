import type { Socket } from 'socket.io';

export interface ListedFile {
  createdAt: number;
  deviceName: string;
  id: string;
  name: string;
  ownerId: string;
  private: boolean;
  size: number;
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

export interface UpdateFilePrivacy extends DownloadFile {
  isPrivate: boolean;
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
