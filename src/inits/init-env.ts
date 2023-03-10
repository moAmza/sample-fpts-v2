import { configEnv } from '../../configs/config-env';

export const Envs = configEnv([
  'MONGO_HOST',
  'MONGO_DB',
  'APP_PORT',
  'JWT_SECRET_KEY',
] as const);
