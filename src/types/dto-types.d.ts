type Brand<A, key> = A & { __type: key };

type Username = Brand<string, 'Username'>;
type ValidUsername = Brand<string, 'ValidUsername'>;
type AvailableValidUsername = Brand<string, 'AvailableValidUsername'>;

type Password = Brand<string, 'Password'>;
type ValidPassword = Brand<string, 'ValidPassword'>;

type Email = Brand<string, 'Email'>;
type ValidEmail = Brand<string, 'ValidEmail'>;
type AvailableValidEmail = Brand<string, 'AvailableValidEmail'>;

type Birthday = Brand<Date, 'Birthday'>;
type ValidBirthday = Brand<Date, 'ValidBirthday'>;

type Country = Brand<string, 'Country'>;
type ValidCountry = Brand<string, 'ValidCountry'>;

type Firstname = Brand<string, 'Firstname'>;
type ValidFirstname = Brand<string, 'ValidFirstname'>;

type Lastname = Brand<string, 'Lastname'>;
type ValidLastname = Brand<string, 'ValidLastname'>;
