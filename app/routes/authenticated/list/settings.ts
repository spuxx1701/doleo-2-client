import Route from '@ember/routing/route';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { ListRouteParams } from '../list';
import AccountService from 'doleo-2-client/services/account';

export default class ListRoute extends Route {
  @service declare store: Store;
  @service declare account: AccountService;

  async model() {
    const { list_id } = this.paramsFor('authenticated/list') as ListRouteParams;
    return RSVP.hash({
      list: await this.store.findRecord('list', list_id),
      family: await this.store.findRecord(
        'family',
        this.account.account?.family.id as string
      ),
    });
  }
}
