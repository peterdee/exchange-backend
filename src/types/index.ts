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
