import { Schema } from 'mongoose';

export interface UserType {
  username: Username;
  password: Password;
  email: Email;
  birthday: Birthday;
  country: Country;
  firstname: Firstname;
  lastname: Lastname;
}

export const initUserSchema = () =>
  new Schema<UserType>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    country: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  });
