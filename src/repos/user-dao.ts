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
  paginated: (a: PaginatedType<MongoDocument<'user'>>) => ({
    count: a.count ?? 0,
    values: a.values.map(userDao.shortUser),
  }),
};
