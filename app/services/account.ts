import emberData__store from '@ember-data/store';
import Service, { inject as service } from '@ember/service';
import ENV from 'doleo-2-client/config/environment';
import { tracked } from '@glimmer/tracking';
import Account from 'doleo-2-client/models/account';
import ManagerService from './manager';

export default class AccountService extends Service {
  @service declare session: any;
  @service declare store: emberData__store;
  @service declare notifications: any;
  @service declare manager: ManagerService;

  @tracked id: string = '';
  @tracked account: Account | undefined;

  patternEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/;

  /**
   * Loads the account.
   */
  async load() {
    if (!this.session.data.authenticated) {
      throw new Error('Attempted to load account without an active session.');
    }
    this.account = await this.store.queryRecord('account', {});
    this.id = this.account.id;
    this.manager.applyDesign();
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

  /**
   * Requests a password reset for a specific account.
   * @param email The account's email.
   */
  async requestPasswordReset(email: string) {
    const encodedEmail = encodeURIComponent(email);
    fetch(`${ENV.apiUrl}/account/reset-password?email=${encodedEmail}`);
    this.notifications.success(
      'Du erhältst eine Email mit Deinem neuen Passwort.'
    );
  }
}
