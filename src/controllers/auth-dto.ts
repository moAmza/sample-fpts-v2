import { z } from 'zod';
import { validate } from '../utils/validate';

export const authDto = {
  input: {
    register: {
      body: validate({
        username: z.string(),
        password: z.string(),
        email: z.string(),
        birthday: z.string().transform((x) => new Date(x)),
        country: z.string(),
        firstname: z.string(),
        lastname: z.string(),
      }),
    },

    login: {
      body: validate({
        username: z.string(),
        password: z.string(),
      }),
    },

    confirm: {
      body: validate({
        email: z.string(),
        code: z.number(),
      }),
    },
  },
  output: {
    label:
      (name: string) =>
      <A>(val: A) => ({ [name]: val }),
    default: <A>(out: A) => out,
    status: (status: boolean) => () => ({ status }),
  },
};
