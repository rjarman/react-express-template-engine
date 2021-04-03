import { ServerCore } from './libs/core.controller';
import {
  JsonParserMiddleware,
  UrlEncodedParserMiddleware,
  SetHeaderMiddleware,
  TextParserMiddleware,
  CookiesParserMiddleware,
} from './libs/middleware/common.middleware';
import { WatcherMiddleware } from './libs/middleware/watcher.middleware';
import { DatabaseController } from './libs/database.controller';
import { IndexRoute } from './pages/Index/index.route';

@ServerCore({
  middleware: [
    TextParserMiddleware,
    JsonParserMiddleware,
    UrlEncodedParserMiddleware,
    SetHeaderMiddleware,
    CookiesParserMiddleware,
    WatcherMiddleware,
  ],
  view: [{ path: '/', view: IndexRoute }],
  database: DatabaseController,
})
class CORE {}
