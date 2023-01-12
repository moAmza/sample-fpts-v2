export const ERR = {
  NOT_FOUND_ERROR: (field: string) => (): NotFoundError => ({
    errorType: 'NOT_FOUND_ERROR',
    statusCode: 404,
    message: `${field} Not Found`,
    errorData: undefined,
  }),
  MONGO_CONFIG_ERROR: (): MongoConfigError => ({
    errorType: 'MONGO_CONFIG_ERROR',
    statusCode: 500,
    message: `Mongo configuration failed.`,
    errorData: undefined,
  }),
  DATABASE_IO_ERROR: (): DatabaseIoError => ({
    errorType: 'DATABASE_IO_ERROR',
    statusCode: 500,
    message: `Can't fetch the data`,
    errorData: undefined,
  }),
  INVALID_INPUT_ERROR: (): InvalidInputError => ({
    errorType: 'INVALID_INPUT_ERROR',
    statusCode: 400,
    message: `Invalid input`,
    errorData: undefined,
  }),
  EMPTY_ENVIRONMENT_VARIABLES: (emptyEnvs: string[]): EmptyEnvironmentVariables => ({
    errorType: 'EMPTY_ENVIRONMENT_VARIABLES',
    statusCode: 500,
    message: `\x1b[31m\nEMPTY ENVIRONMENT VARIABLES: \n  ${emptyEnvs.join('\n  ')}`,
    errorData: undefined,
  }),
  DUPLIDATE_EMAIL_ERROR: (): DuplicateEmailError => ({
    errorType: 'DUPLICATE_EMAIL_ERROR',
    statusCode: 400,
    message: 'Email is duplicated',
    errorData: undefined,
  }),
};
