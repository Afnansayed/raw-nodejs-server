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
