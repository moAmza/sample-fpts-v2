export const verifierDao = {
  short: (a: MongoDocument<'verifier'>) => ({
    email: a.email,
    username: a.userInfo.username,
    firstname: a.userInfo.firstname,
    lastname: a.userInfo.lastname,
    createdAt: a.createdAt,
  }),

  full: (a: MongoDocument<'verifier'>) => ({
    _id: a._id,
    email: a.email,
    userInfo: a.userInfo,
    count: a.count,
    code: a.code,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  }),
};
