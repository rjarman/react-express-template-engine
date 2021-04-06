import { Index } from './Index.view';
import {
  FetchData,
  Response,
  Request,
  RequestHandler,
  ViewInt,
} from '../../libs/server.types';

export class IndexRoute implements ViewInt {
  router(): RequestHandler {
    return (req: Request, res: Response) => {
      FetchData(req, res, Index);
    };
  }
}
