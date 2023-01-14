export type RegisterUserInput = {
  username: AvailableValidUsername;
  password: ValidPassword;
  email: AvailableValidEmail;
  birthday: ValidBirthday;
  country: ValidCountry;
  firstname: ValidFirstname;
  lastname: ValidLastname;
};

type PaginatedUsersInput = {
  limit: number;
  skip: number;
  search: string;
};

export const initUserRepo = (model: MongoModel<'user'>) => ({
  register: async (input: RegisterUserInput) => await model.create(input),
  getByEmail: async (email: string) => await model.findOne({ email }),
  getByUsername: async (username: string) => await model.findOne({ username }),
  getById: async (id: ValidMongoId) => await model.findOne({ _id: id }),
  getPaginatedUsers: async ({
    search,
    limit,
    skip,
  }: PaginatedUsersInput): Promise<PaginatedType<MongoDocument<'user'>>> =>
    await (
      await model.aggregate([
        {
          $match: {
            $or: [
              { username: new RegExp(search, 'i') },
              { firstname: new RegExp(search, 'i') },
              { lastname: new RegExp(search, 'i') },
            ],
          },
        },
        {
          $facet: {
            values: [{ $skip: skip }, { $limit: limit }],
            count: [{ $count: 'count' }],
          },
        },
        { $set: { count: '$count.count' } },
        { $unwind: { path: '$count', preserveNullAndEmptyArrays: true } },
      ])
    )[0],
});
