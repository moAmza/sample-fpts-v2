type InRegisterUser = {
  email: ValidEmail;
  username: ValidUsername;
  password: ValidPassword;
  birthday: ValidBirthday;
  country: ValidCountry;
  firstname: ValidFirstname;
  lastname: ValidLastname;
};

type InConfirmRegister = {
  email: string;
  code: number;
};

type InLoginUser = {
  username: string;
  password: string;
};
