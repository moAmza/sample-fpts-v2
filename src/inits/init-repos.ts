import { initUserRepo } from '../repos/user-repo';
import { configRepos } from '../../configs/config-repos';
import { initVerifierRepo } from '../repos/verifier-repo';

export const initRepos = configRepos((models: AllModels) => ({
  user: initUserRepo(models.mongo.user),
  verifier: initVerifierRepo(models.mongo.verifier),
}));
