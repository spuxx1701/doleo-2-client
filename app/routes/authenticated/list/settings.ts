import Route from '@ember/routing/route';
import CustomStore from 'doleo-2-client/services/custom-store';
import { inject as service } from '@ember/service';
import { ListRouteParams } from '../list';
import AccountService from 'doleo-2-client/services/account';

export default class ListRoute extends Route {
  @service declare store: CustomStore;
  @service declare account: AccountService;

  async model() {
    const { list_id } = this.paramsFor('authenticated/list') as ListRouteParams;
    const list = await this.store.findRecord('list', list_id);
    return list;
  }
}
