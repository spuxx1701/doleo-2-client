import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Account from 'doleo-2-client/models/account';
import ListInvite from 'doleo-2-client/models/list-invite';
import AccountService from './account';
import CustomStore from './store';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;
  @service declare account: AccountService;

  @tracked hasNews = false;
  @tracked listInvites: ListInvite[] = [];

  @action async refresh() {
    // Force a complete refresh on list-invites so we don't accidentally display invites
    // that were created in this session
    if (this.account.account) {
      this.store.unloadAll('list-invite');
      this.listInvites = await this.store
        .findAll('list-invite')
        .filter(
          (element) =>
            element.recipient.id === (this.account.account as Account).id
        );
      this.update();
    }
  }

  @action update() {
    this.hasNews =
      (this.listInvites &&
        this.listInvites.filter((record) => !record.isDestroyed).length > 0) ||
      false;
  }
}
