import { initPlayerRepo, initUserRepo } from '../repos/user-repo';

export const initLazyRepos = (models: AllModels) => ({
  user: initUserRepo(models.mongo.user),
  player: initPlayerRepo(models.mongo.user),
});
