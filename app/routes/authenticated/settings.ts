import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';
import ProfileService from 'doleo-2-client/services/profile';

export default class SettingsRoute extends Route {
  @service declare manager: ManagerService;
  @service declare profile: ProfileService;

  async model() {
    // return this.manager.profile;
  }
}
