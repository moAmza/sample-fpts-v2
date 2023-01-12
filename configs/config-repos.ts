import * as TE from 'fp-ts/TaskEither';
import { ERR } from '../src/errors/not-found-error';

type AllRepos = {
  [RepoKey in keyof AllLazyRepos]: {
    [methodKey in keyof AllLazyRepos[RepoKey]]: AllLazyRepos[RepoKey][methodKey] extends (
      input: infer A,
    ) => Promise<infer B>
      ? (i: A) => TE.TaskEither<DatabaseIoError, B>
      : never;
  };
};

const buildTask =
  <A, B>(val: (i: B) => Promise<A>) =>
  (i: B) =>
    TE.tryCatch(() => val(i), ERR.DATABASE_IO_ERROR);

export const configRepos = (allLzayRepos: AllLazyRepos) => {
  return (Object.keys(allLzayRepos) as (keyof AllLazyRepos)[]).reduce(
    <B extends keyof AllLazyRepos>(allRepos: AllRepos, repoKey: B) => {
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
