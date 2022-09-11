import Route from '@ember/routing/route';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { ListRouteParams } from '../list';

export default class ListRoute extends Route {
  @service declare store: Store;

  async model() {
    const { list_id } = this.paramsFor('authenticated/list') as ListRouteParams;
    return RSVP.hash({
      list: await this.store.findRecord('list', list_id),
      users: await this.store.findAll('user'),
    });
  }
}
