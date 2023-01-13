import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../public/swagger.json';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { initModels } from './inits/init-models';
import { initRepos } from './inits/init-repos';
import { initLazyServices } from './inits/init-services';
import { initRoutes } from './inits/init-routes';
import { initControllers } from './inits/init-controllers';
import { configServices } from '../configs/config-services';
import { Envs } from './inits/init-env';

const run = pipe(
  initModels(),
  TE.map(initRepos),
  TE.map(initLazyServices),
  TE.map(configServices),
  TE.map(initControllers),
  TE.map(initRoutes),
  TE.map((route) =>
    express()
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(express.static('public'))
      .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
      .use(route)
      .listen(Envs.APP_PORT, () => console.log(`listening on port ${Envs.APP_PORT}`)),
  ),
);

run().then((res) => {
  if (E.isLeft(res)) throw res.left;
});
