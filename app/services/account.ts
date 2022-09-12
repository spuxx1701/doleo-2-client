import emberData__store from '@ember-data/store';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Account from 'doleo-2-client/models/account';

export default class AccountService extends Service {
  @service declare session: any;
  @service declare store: emberData__store;
  @service declare notifications: any;

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

  /**
   * Saves the account settings.
   * @param showNotification (optional, default 'true') Whether a notification should be displayed.
   */
  async save({ showNotification = true } = {}) {
    if (this.account?.hasDirtyAttributes) {
      await this.account?.save();
      if (showNotification)
        this.notifications.success('Änderungen wurden gespeichert.');
    }
  }
}
