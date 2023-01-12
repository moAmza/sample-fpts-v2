import * as TE from 'fp-ts/TaskEither';
import { Schema } from 'mongoose';
import { ERR } from '../src/errors/not-found-error';
import { configMongo, MongoConfig } from './config-mongo';

export const confiModels =
  <MongoSchamaObject extends { [key in string]: Schema }>(lazyDb: {
    mongo: MongoConfig<MongoSchamaObject>;
  }) =>
  () => {
    return TE.tryCatch(
      async () => ({
        mongo: await configMongo(lazyDb.mongo),
      }),
      ERR.MONGO_CONFIG_ERROR,
    );
  };
