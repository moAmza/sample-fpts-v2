import { configLazyServices, configServices } from '../../configs/config-services';
import { initAuthService, initPlayerService } from '../services/auth-service';

export const initLazyServices = configLazyServices((repos: AllRepos) => ({
  auth: () => initAuthService(repos.user),
  player: () => initPlayerService(repos.player),
}));
