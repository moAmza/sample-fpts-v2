export const userDao = {
  fullUser: (a: MongoDocument<'user'>) => ({
    id: a._id.toString(),
    username: a.username,
    email: a.email,
    date: a.birthday,
  }),
};
