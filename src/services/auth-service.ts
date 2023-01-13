import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../errors/not-found-error';
import { userDao } from '../repos/user-dao';
import { verifierDao } from '../repos/verifier-dao';
import { checkExisting } from '../utils/check-existing';
import jsonwebtoken from 'jsonwebtoken';
import { Envs } from '../inits/init-env';
import { inspect } from '../utils/inspect';

export const initAuthService =
  (userRepo: RepoType<'user'>, verifierRepo: RepoType<'verifier'>) =>
  (getService: GetServiceType<'auth'>) => {
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

    const generateVerifierSample = <A>(userInfo: A & { email: AvailableValidEmail }) => ({
      userInfo,
      count: 0,
      code: (Math.floor(Math.random() * 90000) + 10000) as VerifierCode,
      email: userInfo.email,
    });

    const validatePassword =
      (password: string) =>
      <A>(i: A & { password: Password }) =>
        i.password === password ? TE.right(i) : TE.left(ERR.INVALID_PASSWORD_ERROR());

    const generateJwt = <A>(i: A & { username: Username; email: Email }) =>
      jsonwebtoken.sign(
        {
          email: i.email,
          username: i.username,
        },
        Envs.JWT_SECRET_KEY,
      );

    const checkVerifierCountLessThan3 = <A>(i: A & { count: number }) =>
      i.count > 2 ? TE.left(ERR.EXPIRED_VERIFIER_ERROR()) : TE.right(i);

    const validateVerifierCode =
      (code: number) =>
      <A>(i: A & { _id: VerifierId; code: number }) =>
        code !== i.code
          ? pipe(
              verifierRepo.increaseCount(i._id),
              TE.chainW((a) => TE.left(ERR.INVALID_VERIFIER_CODE())),
              TE.map(() => i),
            )
          : TE.right({ ...i, code: i.code as VerifierCode });

    const emailCodeToUser = <A>(i: A) => i;

    const preRegister = (input: InRegisterUser) =>
      pipe(
        checkUsernameAvaialble(input),
        TE.chainW(checkEmailAvaialble),
        TE.map(generateVerifierSample),
        TE.map((x) => {
          console.log('REGISTER CONFIRM CODE:', x.code);
          return x;
        }),
        TE.chainW(verifierRepo.create),
        TE.map(verifierDao.short),
        TE.map(emailCodeToUser),
      );

    const login = (input: InLoginUser) =>
      pipe(
        userRepo.getByUsername(input.username),
        TE.chainW(checkExisting('Username')),
        TE.chainW(validatePassword(input.password)),
        TE.map(generateJwt),
      );

    const confirmAndRegister = (input: InConfirmRegister) =>
      pipe(
        verifierRepo.getByEmail(input.email),
        TE.chainW(checkExisting('Verifier')),
        TE.map(verifierDao.full),
        TE.chainW(checkVerifierCountLessThan3),
        TE.chainW(validateVerifierCode(input.code)),
        TE.map((verifier) => verifier.userInfo),
        TE.chainW(checkUsernameAvaialble),
        TE.chainW(checkEmailAvaialble),
        TE.chainW(userRepo.register),
        TE.map(userDao.fullUser),
      );

    return { register: preRegister, login, confirm: confirmAndRegister };
  };
