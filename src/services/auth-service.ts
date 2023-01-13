import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../errors/not-found-error';
import { userDao } from '../repos/user-dao';
import { checkExisting } from '../utils/check-existing';

export const initPlayerService =
  (userRepo: RepoType<'player'>) => (getService: GetServiceType<'auth'>) => {
    const sss = () => {
      return 'as' as 'as';
    };

    return { sss };
  };

export const initAuthService =
  (userRepo: AllRepos['user']) => (getService: GetServiceType<'auth'>) => {
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

    const validatePassword =
      (password: string) =>
      <A>(i: A & { password: Password }) =>
        i.password === password ? TE.right(i) : TE.left(ERR.INVALID_PASSWORD_ERROR());

    const generateJwt = <A>(i: A & { username: Username; email: Email }) => ({
      __TAG: 'JWT',
      email: i.email,
      username: i.username,
    });

    const register = (input: InRegisterUser) =>
      pipe(
        checkUsernameAvaialble(input),
        TE.chainW(checkEmailAvaialble),
        TE.chainW(userRepo.register),
        TE.map(userDao.fullUser),
      );

    const login = (input: InLoginUser) =>
      pipe(
        userRepo.getByUsername(input.username),
        TE.chainW(checkExisting('Username')),
        TE.chainW(validatePassword(input.password)),
        TE.map(generateJwt),
      );

    return { register, login };
  };
