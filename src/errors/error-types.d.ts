type ErrorType =
  | 'NOT_FOUND_ERROR'
  | 'MONGO_CONFIG_ERROR'
  | 'DATABASE_IO_ERROR'
  | 'INVALID_INPUT_ERROR'
  | 'EMPTY_ENVIRONMENT_VARIABLES'
  | 'DUPLICATE_EMAIL_ERROR';

type BaseError = {
  statusCode: number;
  errorType: ErrorType;
  message: string;
  errorData: any;
};

interface NotFoundError extends BaseError {
  errorType: 'NOT_FOUND_ERROR';
  statusCode: 404;
  errorData: undefined;
}

interface MongoConfigError extends BaseError {
  errorType: 'MONGO_CONFIG_ERROR';
  statusCode: 500;
  errorData: undefined;
}

interface DatabaseIoError extends BaseError {
  errorType: 'DATABASE_IO_ERROR';
  statusCode: 500;
  errorData: undefined;
}

interface InvalidInputError extends BaseError {
  errorType: 'INVALID_INPUT_ERROR';
  statusCode: 400;
  errorData: undefined;
}

interface DuplicateEmailError extends BaseError {
  errorType: 'DUPLICATE_EMAIL_ERROR';
  statusCode: 400;
  errorData: undefined;
}

interface EmptyEnvironmentVariables extends BaseError {
  errorType: 'EMPTY_ENVIRONMENT_VARIABLES';
  statusCode: 500;
}
