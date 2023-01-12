import mongoose, { Schema } from 'mongoose';

export type MongoConfig<
  MongoSchamaObject extends { [key in string]: import('mongoose').Schema },
> = {
  options: { host: string; db: string };
  schemas: MongoSchamaObject;
};

export const configMongo = async <MongoSchamaObject extends { [key in string]: Schema }>(
  mongoConfig: MongoConfig<MongoSchamaObject>,
) => {
  type MongoSchemaByName<field extends keyof MongoSchamaObject> =
    MongoSchamaObject[field] extends import('mongoose').Schema<
      any,
      any,
      {},
      {},
      {},
      {},
      any,
      infer A
    >
      ? A
      : never;
  type MongoModel<field extends keyof MongoSchamaObject> = import('mongoose').Model<
    MongoSchemaByName<field>,
    {},
    {},
    {},
    MongoSchamaObject[field]
  >;

  mongoose.set('strictQuery', false);
  const mongo = await mongoose.connect(
    `mongodb://${mongoConfig.options.host}/${mongoConfig.options.db}`,
  );

  const models = (Object.keys(mongoConfig.schemas) as (keyof MongoSchamaObject)[]).reduce(
    (prev, curr) => {
      //@ts-ignore
      prev[curr] = mongo.model(curr as string, mongoConfig.schemas[curr]);
      return prev;
    },
    {} as { [field in keyof MongoSchamaObject]: MongoModel<field> },
  );

  return models;
};
