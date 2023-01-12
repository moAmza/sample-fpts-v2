type RegisterUserInput = {
  username: AvailableValidUsername;
  password: ValidPassword;
  email: AvailableValidEmail;
  birthday: ValidBirthday;
  country: ValidCountry;
  firstname: ValidFirstname;
  lastname: ValidLastname;
};

export const initUserRepo = (model: MongoModel<'user'>) => ({
  register: async (input: RegisterUserInput) => await model.create(input),
  getByEmail: async (email: ValidEmail) => await model.findOne({ email }),
  getByUsername: async (username: ValidUsername) => await model.findOne({ username }),
});

export const initPlayerRepo = (model: MongoModel<'user'>) => ({
  ass: async (input: RegisterUserInput) => await model.create(input),
});
