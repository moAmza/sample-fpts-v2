import { isValidObjectId } from 'mongoose';
import { ERR } from '../errors/not-found-error';
import * as TE from 'fp-ts/TaskEither';

export const validateMongoObjectId =
  <A extends string>(key: A) =>
  <B>(i: B & { [i in A]: string }) =>
    TE.tryCatch(async () => {
      if (isValidObjectId(i[key])) return i as B & { [i in A]: ValidMongoId };
      throw new Error();
    }, ERR.INVALID_OBJECTID_ERROR);
