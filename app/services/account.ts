import emberData__store from '@ember-data/store';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Account from 'doleo-2-client/models/account';

export default class AccountService extends Service {
  @service declare session: any;
  @service declare store: emberData__store;

  @tracked account: Account | undefined;

  /**
   * Loads the account.
   */
  async load() {
    if (!this.session.data.authenticated) {
      throw new Error('Attempted to load account without an active session.');
    }
    this.account = await this.store.queryRecord('account', {});
    return this.account;
  }

  async update(updatedAccount: Account) {}

  /**
   * Returns the ID of the currently signed in user.
   */
  get userId() {
    if (!this.session.data.authenticated) return null;
    return this.session.data.authenticated.sub;
  }

  // /**
  //  * Returns the currently signed-in user.
  //  */
  // get account(): Account | null {
  //   if (!this.session.data.authenticated) return null;
  //   return this.session.data.authenticated.user as Account;
  // }

  // /**
  //  * Updates the currently signed-in user.
  //  */
  // set account(user: Account | null) {
  //   this.session.data.user = user;
  // }
}
