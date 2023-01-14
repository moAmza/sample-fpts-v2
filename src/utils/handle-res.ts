import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { Response } from 'express';
import mongoose from 'mongoose';
import { ERR } from '../errors/not-found-error';

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
  params: (i: any) => Promise<infer A>;
}
  ? A
  : any;

export type SimpleType<A extends { [key: string]: any }> = {
  [key in keyof A]: A[key] extends { __type: any } & string
    ? string
    : A[key] extends { __type: any } & number
    ? number
    : A[key] extends { __type: any } & Date
    ? Date
    : A[key] extends { __type: any } & mongoose.Types.ObjectId
    ? string
    : A[key] extends { [key: string]: any }
    ? SimpleType<A[key]>
    : A[key];
};

export type RightExampleType<
  T extends (
    ...args: any[]
  ) => Promise<TE.TaskEither<any, any>> | TE.TaskEither<any, any>,
> = SimpleType<Right<Awaited<ReturnType<T>>>>;

export type LeftExampleType<
  T extends (...args: any[]) => Promise<TE.TaskEither<any, any>>,
  E extends T extends (
    ...args: any[]
  ) => Promise<TE.TaskEither<infer A extends BaseError, any>>
    ? A['errorType']
    : never,
> = ReturnType<typeof ERR[E]>;

export const handleRes =
  (res?: Response) =>
  async <E extends BaseError, A>(i: TE.TaskEither<E, A>) => {
    if (res) {
      const data = await i();
      if (E.isLeft(data)) {
        res.status(data.left.statusCode).json(data.left);
      } else {
        res.status(200).json(data.right);
      }
    }
    return i;
  };
