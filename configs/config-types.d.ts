type ExpressReq = import('express').Request;

/*
// fp-ts types
*/
type Right<TE extends import('fp-ts/TaskEither').TaskEither> =
  TE extends import('fp-ts/TaskEither').TaskEither<E, infer R> ? R : never;

/*
// service types
*/
type AllLazyServices = ReturnType<
  typeof import('../src/inits/init-services').initLazyServices
>;
type AllServices = {
  [field in keyof AllLazyServices]: ReturnType<GetServiceType<field>>;
};
type GetServiceType<A extends keyof AllLazyServices> = <B extends A>(
  service: B,
) => ReturnType<ReturnType<AllLazyServices[B]>>;
type Service<T extends keyof AllLazyServices> = ReturnType<GetServiceType<T>>;

/*
//  mongo types
*/
type MongoModel<field extends keyof AllModels['mongo']> = AllModels['mongo'][field];
type MongoDocument<A extends keyof AllModels['mongo']> =
  AllModels['mongo'][A] extends import('mongoose').Model<infer B, any, any, any>
    ? B & { _id: import('mongoose').Types.ObjectId }
    : never;

/*
// repo types
*/
type RepoType<A extends keyof AllRepos> = AllRepos[A];

/*
//  router types
*/
type MethodControllers = {
  get?: Controller;
  post?: Controller;
  put?: Controller;
  delete?: Controller;
};
type Api = { children?: { [field: string]: Api }; routes?: MethodControllers };
type Controller = (req: import('express').Request, ...args: any[]) => any;

/*
//  controller types
*/
type AllControllers = ReturnType<
  typeof import('../src/inits/init-controllers').initLazyControllers
>;

type DtoType = {
  body?: (i: any) => Promise<any>;
  params?: (i: any) => Promise<any>;
  query?: (i: any) => Promise<any>;
};
