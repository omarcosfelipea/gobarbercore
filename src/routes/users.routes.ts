import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

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
  },
);

export default usersRouter;
