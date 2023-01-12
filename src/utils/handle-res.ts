import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { Response } from 'express';

export type BodyTypeOf<D extends DtoType> = D extends {
  body: (i: any) => Promise<infer A>;
}
  ? A
  : any;
export type QueryTypeOf<D extends DtoType> = D extends {
  query: (i: any) => Promise<infer A>;
}
  ? A
  : any;
export type ParamsTypeOf<D extends DtoType> = D extends {
  Params: (i: any) => Promise<infer A>;
}
  ? A
  : any;

export const handleRes =
  (res?: Response) =>
  async <E extends BaseError, A>(i: TE.TaskEither<E, A>) => {
    if (res) {
      const data = await i();
      if (E.isLeft(data)) {
        res.status(data.left.statusCode).json(data.left);
      } else {
        res.status(200).json(data.right);
        return data.right;
      }
    }
    return {} as A;
  };
