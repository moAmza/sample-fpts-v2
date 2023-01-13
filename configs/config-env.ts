import { config } from 'dotenv';

export const configEnv = <A extends readonly string[]>(envs: A) => {
  config();
  const envErrors: string[] = [];
  const configs = envs.reduce((prev, curr) => {
    const env: string | undefined = process.env[curr];
    if (env === undefined) envErrors.push(curr);
    return { ...prev, [curr]: env };
  }, {} as { [field in typeof envs[number]]: string });
  if (envErrors.length)
    throw Error(`\x1b[31m\nEMPTY ENVIRONMENT VARIABLES: \n  ${envErrors.join('\n  ')}`);
  return configs;
};
