import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const userFull = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const user = {
      id: userFull.id,
      name: userFull.name,
      email: userFull.email,
      avatar: userFull.avatar,
      create_at: userFull.create_at,
      updated_at: userFull.updated_at,
    };

    return response.json(user);
  }
}
