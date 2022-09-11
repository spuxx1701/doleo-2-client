import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';

export default class SettingsRoute extends Route {
  @service declare manager: ManagerService;

  async model() {
    return this.manager.profile;
  }
}
