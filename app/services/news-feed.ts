import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import AccountService from './account';
import CustomStore from './store';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;
  @service declare account: AccountService;

  @tracked hasNews = false;
  @tracked listInvites: ListInvite[] = [];

  @action async refresh() {
    this.listInvites = (await this.store.findAll('list-invite')).toArray();
    this.update();
  }

  @action update() {
    this.hasNews =
      (this.listInvites &&
        this.listInvites.filter((record) => !record.isDestroyed).length > 0) ||
      false;
  }
}
