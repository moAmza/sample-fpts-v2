import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../src/errors/not-found-error';

export const configRepos =
  <
    R extends string,
    M extends string,
    A extends {
      [RepoKey in R]: {
        [MethodKey in M]: (input: any) => Promise<any>;
      };
    },
  >(
    initLazyRep: (models: AllModels) => A,
  ) =>
  (models: AllModels) => {
    type AllRepos = {
      [RepoKey in keyof A]: {
        [methodKey in keyof A[RepoKey]]: A[RepoKey][methodKey] extends (
          input: infer A,
        ) => Promise<infer B>
          ? (i: A) => TE.TaskEither<DatabaseIoError, B>
          : never;
      };
    };
    const allLzayRepos = initLazyRep(models);
    return (Object.keys(allLzayRepos) as (keyof A)[]).reduce(
      <B extends keyof A>(allRepos: AllRepos, repoKey: B) => {
        const repo = Object.keys(allLzayRepos[repoKey]).reduce((prev, curr) => {
          prev[curr] = (i: B) =>
            TE.tryCatch(() => allLzayRepos[repoKey][curr](i), ERR.DATABASE_IO_ERROR);
          return prev;
        }, {} as AllRepos[typeof repoKey]);
        allRepos[repoKey] = repo;

        return allRepos;
      },
      {} as AllRepos,
    );
  };
