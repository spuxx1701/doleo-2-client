import Service, { inject as service } from '@ember/service';
import ENV from 'doleo-2-client/config/environment';
import { tracked } from '@glimmer/tracking';
import Account from 'doleo-2-client/models/account';
import ManagerService from './manager';
import CustomStore from './custom-store';
import NewsFeedService from './news-feed';
import LocalDataService from './local-data';

export default class AccountService extends Service {
  @service declare session: any;
  @service declare store: CustomStore;
  @service declare notifications: any;
  @service declare manager: ManagerService;
  @service declare newsFeed: NewsFeedService;
  @service declare localData: LocalDataService;

  @tracked id = '';
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
    this.account.enableTelemetry = this.localData.getEnabledTelemetry();
    this.id = this.account.id;
    this.manager.applyDesign();
    this.newsFeed.initialize();
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
    fetch(`${ENV.apiUrl}/account/resetPassword?email=${encodedEmail}`);
    this.notifications.success(
      'Du erhältst eine Email mit Deinem neuen Passwort.'
    );
  }
}
