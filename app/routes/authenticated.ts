import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';
import AccountService from 'doleo-2-client/services/account';
import RSVP, { reject } from 'rsvp';
import transition from '@ember/routing/transition';
import CustomStore from 'doleo-2-client/services/custom-store';
import RouterService from '@ember/routing/router-service';

export default class ProtectedRoute extends Route {
  @service declare router: RouterService;
  @service declare store: CustomStore;
  @service declare session: any;
  @service declare manager: ManagerService;
  @service declare account: AccountService;

  async beforeModel(transition: transition<unknown>) {
    try {
      this.session.requireAuthentication(transition, 'login');
    } catch (error) {
      this.router.transitionTo('login');
    }
  }

  async model() {
    try {
      await this.account.load();
      const lists = await this.store.findAll('list');
      return RSVP.hash({
        lists: lists,
      });
    } catch (error) {
      // If we run into this error, the access token has likely expired.
      this.session.invalidate();
      reject;
    }
  }
}
