import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class ProtectedRoute extends Route {
  @service declare store: Store;

  async model() {
    const lists = await this.store.findAll('list');
    return RSVP.hash({
      lists: lists,
    });
  }
}
