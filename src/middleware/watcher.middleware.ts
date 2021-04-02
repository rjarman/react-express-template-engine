import { Color } from '../server.types';
import { Request, Response, NextFunction } from '../server.types';

export const WatcherMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // Color.warning('From Watcher: ');
  // console.log('request from: ', Color.custom.bgYellow(JSON.stringify(ip)));
  // console.log('content-type: ', req.header('content-type'));
  next();
};
