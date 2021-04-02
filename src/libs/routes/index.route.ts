import { Index } from '../../pages/Index/Index.view';
import {
  FetchData,
  Response,
  Request,
  RequestHandler,
  ViewInt,
} from '../../server.types';
import { scripts, styles } from '../../config.json';

export class IndexRoute implements ViewInt {
  router(): RequestHandler {
    return (req: Request, res: Response) => {
      FetchData(req, res, Index, { scripts: scripts, styles: styles });
    };
  }
}
