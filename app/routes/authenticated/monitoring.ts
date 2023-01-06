import Route from '@ember/routing/route';
import { service } from '@ember/service';
import CustomStore from 'doleo-2-client/services/custom-store';
import RSVP from 'rsvp';

export default class MonitoringRoute extends Route {
  @service declare store: CustomStore;

  model() {
    return RSVP.hash({
      clientErrors: this.store.findAll('clientError'),
    });
  }
}
