import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const userFull = await createUser.execute({
      name,
      email,
      password,
    });

    const user = {
      id: userFull.id,
      name: userFull.name,
      email: userFull.email,
      create_at: userFull.create_at,
      updated_at: userFull.updated_at,
    };

    return response.json(user);
  }
}