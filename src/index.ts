import { initModels } from './inits/init-models';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { configRepos } from '../configs/config-repos';
import { initLazyRepos } from './inits/init-repos';
import { initLazyServices } from './inits/init-services';
import { configService } from '../configs/config-services';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { initRoutes } from './inits/init-routes';
import { configRoutes } from '../configs/config-routes';
import * as E from 'fp-ts/Either';
import { initLazyControllers } from './inits/init-controllers';
import { Configs } from '../configs/config-env';
import swaggerConfig from '../public/swagger.json';

const configDomain = pipe(
  initModels(),
  TE.map(initLazyRepos),
  TE.map(configRepos),
  TE.map(initLazyServices),
  TE.map(configService),
  TE.map(initLazyControllers),
  TE.map(initRoutes),
  TE.map(configRoutes('/')),
);

const run = async () => {
  const routeTask = await configDomain();

  if (E.isRight(routeTask)) {
    express()
      .use(express.static('public'))
      .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(routeTask.right)
      .listen(Configs.APP_PORT, () =>
        console.log(`listening on port ${Configs.APP_PORT}`),
      );
  } else throw routeTask.left;
};

run();
