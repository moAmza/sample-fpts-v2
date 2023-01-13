import { ERR } from '../errors/not-found-error';
import * as TE from 'fp-ts/TaskEither';
import { Request } from 'express';

export const ReqTasks =
  (req: Request & { body?: any; query?: any; params?: any }) =>
  <A, B, C>(validator: {
    body?: (i: any) => Promise<A>;
    query?: (i: any) => Promise<B>;
    params?: (i: any) => Promise<C>;
  }) =>
  <T extends A & B & C>() =>
    TE.tryCatch(async () => {
      let body = validator.body ? await validator.body(req.body) : ({} as A);
      let query = validator.query ? await validator.query(req.query) : ({} as B);
      let params = validator.params ? await validator.params(req.params) : ({} as C);

      return { ...body, ...query, ...params } as {
        [key in keyof A & B & C]: any;
      } extends T
        ? T
        : 'CANT CONVERT VALIDATED TYPE TO THES TYPE';
    }, ERR.INVALID_INPUT_ERROR);
