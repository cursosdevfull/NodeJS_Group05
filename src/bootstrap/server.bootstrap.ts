import { Application } from 'express';
import http from 'http';

export interface IServerBootstrap {
  initialize(): Promise<any>;
}

export class ServerBootstrap implements IServerBootstrap {
  constructor(private app: Application) {}

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(4000)
        .on('listening', () => {
          console.log('Server is running on port 4000');
          resolve(true);
        })
        .on('error', (error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
