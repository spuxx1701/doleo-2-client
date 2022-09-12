import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';
import AccountService from 'doleo-2-client/services/account';

export default class SettingsRoute extends Route {
  @service declare manager: ManagerService;
  @service declare account: AccountService;

  async model() {
    // return this.manager.account;
  }
}
