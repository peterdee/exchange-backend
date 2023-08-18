import type { Socket } from 'socket.io';

export interface ListedFile {
  createdAt: number;
  deviceName: string;
  fileName: string;
  fileSize: number;
  grant: string;
  id: string;
  ownerId: string;
  passwordHash: string;
  withPassword: boolean;
}

export interface AcknowledgementMessage<T = null> {
  data?: T;
  info: string;
  status: number;
}

export interface GenericFileData {
  fileId: string;
  ownerId: string;
}

export interface CustomSocket extends Socket {
  listedFiles: ListedFile[];
}

export type DeleteFile = Pick<GenericFileData, 'fileId'>;

export interface DownloadFile extends GenericFileData {
  grant?: string;
}

export interface ChangePassword extends GenericFileData {
  password: string;
}

export interface RequestGrant extends GenericFileData {
  password: string;
}

export interface RequestFileChunk extends GenericFileData {
  chunkIndex: number;
  targetId: string;
}

export type UpdateDeviceName = Pick<GenericFileData, 'ownerId'> & {
  newDeviceName: string;
}

export interface UplaodFileChunk extends GenericFileData {
  chunk: string;
  currentChunk: number;
  fileName: string;
  fileSize: number;
  targetId: string;
  totalChunks: number;
  type: string;
}
