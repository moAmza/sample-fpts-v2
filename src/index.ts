import { initModels } from './inits/init-models';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { initRepos } from './inits/init-repos';
import { initLazyServices } from './inits/init-services';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { initRoutes } from './inits/init-routes';
import * as E from 'fp-ts/Either';
import { initControllers } from './inits/init-controllers';
import swaggerConfig from '../public/swagger.json';
import { configServices } from '../configs/config-services';
import { Envs } from './inits/init-env';

const run = pipe(
  initModels(),
  TE.map(initRepos),
  TE.map(initLazyServices),
  TE.map(configServices),
  TE.map(initControllers),
  TE.map(initRoutes('/')),
  TE.map((route) => {
    express()
      .use(express.static('public'))
      .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(route)
      .listen(Envs.APP_PORT, () => console.log(`listening on port ${Envs.APP_PORT}`));
  }),
);

run().then((res) => {
  if (E.isLeft(res)) throw res.left;
});
