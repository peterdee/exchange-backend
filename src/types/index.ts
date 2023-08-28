import type { Socket } from 'socket.io';

interface GenericListedFileData {
  createdAt: number;
  deviceName: string;
  fileName: string;
  fileSize: number;
  id: string;
  ownerId: string;
  totalDownloads: number;
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

export interface ListedFile extends GenericListedFileData {
  grant: string;
  passwordHash: string;
}

export interface ListFile extends GenericListedFileData {
  password: string;
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
  chunk: ArrayBuffer;
  currentChunk: number;
  fileName: string;
  fileSize: number;
  targetId: string;
  totalChunks: number;
  type: string;
}
