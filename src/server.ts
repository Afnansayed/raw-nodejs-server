import http, { IncomingMessage, Server, ServerResponse } from 'http';
import config from './confiq';
import { routes } from './helpers/RoutesHandler';
import './routes';

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method?.toLocaleUpperCase() || '';
    const path = req.url || '';

    const methodsMap = routes.get(method);
    const handler = methodsMap?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(
        JSON.stringify({
          success: false,
          message: 'path not found',
          path: path,
        })
      );
    }
    console.log('Server is running ......');
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
