import { configRoutes } from '../../configs/config-routes';

export const initRoutes = (path: string) => (controllers: AllControllers) =>
  configRoutes(path)({
    children: {
      auth: {
        children: {
          register: {
            routes: { post: controllers.auth.register.bind(controllers.auth) },
          },
          login: {
            routes: { post: controllers.auth.login.bind(controllers.auth) },
          },
        },
      },
    },
  });
