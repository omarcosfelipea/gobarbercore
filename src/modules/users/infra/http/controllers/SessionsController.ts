import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

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
  }
}
