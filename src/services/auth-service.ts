import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../errors/not-found-error';
import { userDao } from '../repos/user-dao';

export const initAuthService =
  (userRepo: RepoType<'user'>) => (getService: GetServiceType<'user'>) => {
    const checkUsernameAvaialble = <A>(i: A & { username: ValidUsername }) =>
      pipe(
        userRepo.getByUsername(i.username),
        TE.chainW((x) =>
          x === null
            ? TE.right({
                ...i,
                username: i.username as unknown as AvailableValidUsername,
              })
            : TE.left(ERR.DUPLIDATE_EMAIL_ERROR()),
        ),
      );

    const checkEmailAvaialble = <A>(i: A & { email: ValidEmail }) =>
      pipe(
        userRepo.getByEmail(i.email),
        TE.chainW((x) =>
          x === null
            ? TE.right({
                ...i,
                email: i.email as unknown as AvailableValidUsername,
              })
            : TE.left(ERR.DUPLIDATE_EMAIL_ERROR()),
        ),
      );

    const register = (input: InRegisterUser) =>
      pipe(
        checkUsernameAvaialble(input),
        TE.chainW(checkEmailAvaialble),
        TE.chainW(userRepo.register),
        TE.map(userDao.fullUser),
      );

    return {
      register,
    };
  };
