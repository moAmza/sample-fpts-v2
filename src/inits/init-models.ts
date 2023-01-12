import { Configs } from '../../configs/config-env';
import { initUserSchema } from '../schemas/user-schema';
import { confiModels } from '../../configs/config-models';

export const initModels = confiModels({
  mongo: {
    options: { host: Configs.MONGO_HOST, db: Configs.MONGO_DB },
    schemas: { user: initUserSchema() },
  },
});
