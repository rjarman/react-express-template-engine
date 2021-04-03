import { Request, Response, NextFunction, express } from '../../server.types';

export const TextParserMiddleware = (() => {
  return express.text();
})();

export const JsonParserMiddleware = (() => {
  return express.json();
})();

export const UrlEncodedParserMiddleware = (() => {
  return express.urlencoded({ extended: true });
})();

export const SetHeaderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080/');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  next();
};

export const CookiesParserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.header('cookie');
  const cookiesObj: { [key: string]: string } = {};
  if (cookies !== '') {
    cookies?.split('; ').forEach((cookie) => {
      const keyValue = cookie.split('=');
      cookiesObj[keyValue[0]] = keyValue[1];
    });
  }
  req.cookies = cookiesObj;
  next();
};
