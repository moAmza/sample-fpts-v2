import { z } from 'zod';
import { validate } from '../utils/validate';

export const userDto = {
  input: {
    getAll: {
      query: validate({
        page: z.string().default('1').transform(Number),
        num: z.string().default('10').transform(Number),
        search: z.string().default(''),
      }),
    },
    getOne: {
      params: validate({
        userId: z.string().default(''),
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
      <B extends string>(name: B) =>
      <A>(val: A) =>
        ({ [name]: val } as { [name in B]: A }),
    default: <A>(out: A) => out,
    status: (status: boolean) => () => ({ status }),
  },
};
