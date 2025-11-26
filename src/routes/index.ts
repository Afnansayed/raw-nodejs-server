import { readUsers, writeUsers } from '../helpers/fileDB';
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

addRoute('POST', '/api/users', async (req, res) => {
  const body = await parseBody(req);

  const users = readUsers();

  const newUser = body;
  users.push(newUser);
  writeUsers(users);
  sendJson(res, 200, {
    success: true,
    data: body,
    path: req.url,
  });
});

addRoute('PUT', '/api/users/:id', async (req, res) => {
  const { id } = (req as any).params;
  const body = await parseBody(req);

  const users = readUsers();

  const index = users.findIndex((user: any) => user.id == id);

  if (index === -1) {
    return sendJson(res, 404, {
      success: false,
      message: 'user not found',
    });
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  writeUsers(users);

  sendJson(res, 202, {
    success: true,
    message: `id ${id} user updated`,
    data: users[index],
  });
});
