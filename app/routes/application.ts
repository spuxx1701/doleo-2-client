import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';

export default class ApplicationRoute extends Route {
  @service declare store: Store;
  @service declare manager: ManagerService;

  async afterModel() {
    this.manager.initialize();
  }
}
