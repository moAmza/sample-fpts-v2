type CreateVerifierRepo = {
  code: VerifierCode;
  count: number;
  email: AvailableValidEmail;
  userInfo: InRegisterUser;
};

export const initVerifierRepo = (model: MongoModel<'verifier'>) => ({
  create: async (input: CreateVerifierRepo) => await model.create(input),
  getByEmail: async (email: string) =>
    await model.findOne({ email }, {}, { sort: { createdAt: -1 } }),
  increaseCount: async (id: MongoIdType) =>
    await model.updateOne({ _id: id }, { $inc: { count: 1 } }),
});
