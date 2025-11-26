import parseBody from '../helpers/parseBody';
import addRoute from '../helpers/RoutesHandler';
import sendJson from '../helpers/sendJson';

addRoute('GET', '/', (req, res) => {
  sendJson(res, 200, {
    message: 'Hello from node js with typescript live server changes again...',
    path: req.url,
  });
});

addRoute('GET', '/api', (req, res) => {
  sendJson(res, 200, {
    message: 'Health status ok',
    path: req.url,
  });
});

addRoute('POST', '/api/user', async (req, res) => {
  const body = await parseBody(req);
  sendJson(res, 200, {
    success: true,
    data: body,
    path: req.url
  });
});
