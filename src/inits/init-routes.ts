export const initRoutes = (controllers: AllControllers): Api => ({
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
