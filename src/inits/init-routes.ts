import { configRoutes } from '../../configs/config-routes';

export const initRoutes = (controllers: AllControllers) =>
  configRoutes('/')({
    children: {
      auth: {
        children: {
          signup: {
            routes: { post: controllers.auth.signup.bind(controllers.auth) },
          },
          login: {
            routes: { post: controllers.auth.login.bind(controllers.auth) },
          },
          confirmation: {
            routes: { post: controllers.auth.confirmation.bind(controllers.auth) },
          },
        },
      },
    },
  });
