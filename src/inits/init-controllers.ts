import { initAuthController } from '../controllers/auth-controller';
import { initUserController } from '../controllers/user-controller';

export const initControllers = (services: AllServices) => ({
  auth: initAuthController(services.auth),
  user: initUserController(services.user),
});
