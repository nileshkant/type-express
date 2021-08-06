import { UserRoutes } from './users';

export interface RouteInterface {
  method: string;
  route: string;
  action: string;
  uploadType?: any;
}
export const Routes = [...UserRoutes];
