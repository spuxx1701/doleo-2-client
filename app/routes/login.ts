import Route from '@ember/routing/route';
import { Router } from '@ember/routing';
import { service } from '@ember/service';

export default class LoginRoute extends Route {
  @service declare router: Router;
  @service declare session: any;
  beforeModel(): void {
    if (this.session.isAuthenticated) {
      this.router.transitionTo('/');
    }
  }
}
