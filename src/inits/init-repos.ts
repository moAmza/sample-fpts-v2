import { initPlayerRepo, initUserRepo } from '../repos/user-repo';
import { configRepos } from '../../configs/config-repos';

export const initRepos = configRepos((models: AllModels) => ({
  user: initUserRepo(models.mongo.user),
  player: initPlayerRepo(models.mongo.user),
  ds: initPlayerRepo(models.mongo.user),
}));
