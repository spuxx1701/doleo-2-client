import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';
import AccountService from 'doleo-2-client/services/account';
import LocalDataService from 'doleo-2-client/services/local-data';

export default class SettingsRoute extends Route {
  @service declare manager: ManagerService;
  @service declare account: AccountService;
  @service declare localData: LocalDataService;

  async model() {
    return this.account.account;
  }
}
