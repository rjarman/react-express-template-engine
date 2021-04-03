import { Index } from './Index.view';
import {
  FetchData,
  Response,
  Request,
  RequestHandler,
  ViewInt,
} from '../../server.types';
import { scripts, styles } from '../../app.json';

export class IndexRoute implements ViewInt {
  router(): RequestHandler {
    return (req: Request, res: Response) => {
      FetchData(req, res, Index, { scripts: scripts, styles: styles });
    };
  }
}
