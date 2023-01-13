import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../errors/not-found-error';
import { userDao } from '../repos/user-dao';

export const initUserService =
  (userRepo: RepoType<'user'>) => (getService: GetServiceType<'auth'>) => {
    return {};
  };
