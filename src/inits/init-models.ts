import { initUserSchema } from '../schemas/user-schema';
import { confiModels } from '../../configs/config-models';
import { Envs } from './init-env';
import { initVerifierSchema } from '../schemas/verifier-schema';

export const initModels = confiModels({
  mongo: {
    options: { host: Envs.MONGO_HOST, db: Envs.MONGO_DB },
    schemas: {
      user: initUserSchema(),
      verifier: initVerifierSchema(),
    },
  },
});
