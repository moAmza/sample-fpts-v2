import { Router } from 'express';

export const configRoutes =
  (path: string) =>
  ({ routes, children }: Api) => {
    const router = Router();
    if (routes) {
      (Object.keys(routes) as (keyof typeof routes)[]).forEach((type) => {
        const controller = routes[type];
        console.log('router initializes: ', controller);

        if (controller) {
          router.route(path)[type]((req) => controller(req));
        }
      });
    }

    if (children)
      Object.keys(children).forEach((val) => {
        if (children && children[val])
          router.use(path, configRoutes('/' + val)(children[val]));
      });

    return router;
  };
