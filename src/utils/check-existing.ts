import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../errors/not-found-error';

export const checkExisting =
  <B extends string>(name: B) =>
  <A>(x: A | null) =>
    pipe(x === null ? TE.left(ERR.NOT_FOUND_ERROR(name)()) : TE.right(x));
