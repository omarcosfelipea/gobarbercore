import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const userFull = await authenticateUser.execute({ email, password });

  const token = userFull.token;

  const user = {
    id: userFull.user.id,
    name: userFull.user.name,
    email: userFull.user.email,
    avatar: userFull.user.avatar,
    create_at: userFull.user.create_at,
    updated_at: userFull.user.updated_at,
  };

  return response.json({ user, token });
});

export default sessionsRouter;
