import { ServerCore } from './libs/core.controller';
import {
  JsonParserMiddleware,
  UrlEncodedParserMiddleware,
  SetHeaderMiddleware,
  TextParserMiddleware,
  CookiesParserMiddleware,
} from './middleware/common.middleware';
import { WatcherMiddleware } from './middleware/watcher.middleware';
import { DatabaseController } from './libs/database.controller';
import { IndexRoute } from './libs/routes/index.route';

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
