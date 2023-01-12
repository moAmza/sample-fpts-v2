import { initAuthController } from '../controllers/auth-controller';

export const initLazyControllers = (services: AllServices) => ({
  auth: initAuthController(services.auth),
  user: initAuthController(services.user),
});
