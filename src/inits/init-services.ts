import { configLazyServices } from '../../configs/config-services';
import { initAuthService } from '../services/auth-service';
import { initUserService } from '../services/user-service';

export const initLazyServices = configLazyServices((repos: AllRepos) => ({
  auth: () => initAuthService(repos.user, repos.verifier),
  user: () => initUserService(repos.user),
}));
