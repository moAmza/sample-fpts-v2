export const userDao = {
  fullUser: (a: MongoDocument<'user'>) => ({
    id: a._id,
    username: a.username,
    email: a.email,
    birthday: a.birthday,
    country: a.country,
    firstname: a.firstname,
    lastname: a.lastname,
  }),
  shortUser: (a: MongoDocument<'user'>) => ({
    id: a._id,
    username: a.username,
    email: a.email,
  }),
};
