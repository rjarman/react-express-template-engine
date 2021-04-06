import { ApplicationHandler } from './application.controller';
import { ServerArg, Class } from './server.types';

export const ServerCore = (serverArgs: ServerArg) => {
  return (_: Class<any>) => {
    const application = new ApplicationHandler({
      middleware: serverArgs.middleware,
      view: serverArgs.view,
      database: serverArgs.database,
    });
    application.listen();
  };
};
