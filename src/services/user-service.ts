import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../errors/not-found-error';
import { userDao } from '../repos/user-dao';
import { checkExisting } from '../utils/check-existing';
import { inspect } from '../utils/inspect';
import { validateMongoObjectId } from '../utils/validate-mongo-objectid';

export const initUserService =
  (userRepo: RepoType<'user'>) => (getService: GetServiceType<'auth'>) => {
    const getAllUsers = (input: InGetAllUsers) =>
      pipe(
        userRepo.getPaginatedUsers({
          skip: input.num * (input.page - 1),
          limit: input.num,
          search: input.search,
        }),
        TE.map(inspect('user')),
        TE.map(userDao.paginated),
        TE.map((x) => x),
      );

    const getOneUser = (input: InGetOneUser) =>
      pipe(
        validateMongoObjectId('userId')(input),
        TE.chainW((x) => userRepo.getById(x.userId)),
        TE.chainW(checkExisting('User')),
        TE.map(userDao.fullUser),
      );

    return { getAllUsers, getOneUser };
  };
