import { Index } from '../../pages/Index';
import {
  FetchData,
  Response,
  Request,
  RequestHandler,
  ViewInt,
} from '../../server.types';

export class IndexRoute implements ViewInt {
  router(): RequestHandler {
    return (req: Request, res: Response) => {
      FetchData(req, res, Index, 'index.html');
    };
  }
}
