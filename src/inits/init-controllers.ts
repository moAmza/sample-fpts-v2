import { initAuthController } from '../controllers/auth-controller';

export const initControllers = (services: AllServices) => ({
  auth: initAuthController(services.auth),
  player: initAuthController(services.auth),
});
