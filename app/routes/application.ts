import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';

export default class ApplicationRoute extends Route {
  @service declare session: any;
  @service declare manager: ManagerService;

  async beforeModel() {
    this.manager.initialize();
    await this.session.setup();
  }
}
