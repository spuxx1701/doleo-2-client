import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';
import AccountService from 'doleo-2-client/services/account';
import RSVP from 'rsvp';

export default class ProtectedRoute extends Route {
  @service declare store: Store;
  @service declare manager: ManagerService;
  @service declare account: AccountService;

  async model() {
    await this.account.load();
    const lists = await this.store.findAll('list');
    return RSVP.hash({
      lists: lists,
    });
  }
}
