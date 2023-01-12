export const initRoutes = (controllers: AllControllers): Api => ({
  routes: { post: controllers.auth.register.bind(controllers.auth) },
  children: {
    aaa: { routes: {} },
  },
});
