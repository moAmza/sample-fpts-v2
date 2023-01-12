import { initAuthService } from '../services/auth-service';

export const initLazyServices = (repos: AllRepos) => ({
  auth: () => initAuthService(repos.user),
  user: () => initAuthService(repos.user),
});
