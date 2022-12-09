import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';

export default class ApplicationRoute extends Route {
  @service declare router: RouterService;
  @service declare session: any;
  @service declare manager: ManagerService;

  async beforeModel() {
    this.manager.initialize();
    try {
      await this.session.setup();
    } catch (error: any) {
      this.router.transitionTo('login');
    }
  }
}
