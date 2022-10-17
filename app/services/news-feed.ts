import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import AccountService from './account';
import PushNotificationService from './push-notification';
import CustomStore from './custom-store';
import Ping from 'doleo-2-client/models/ping';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;
  @service declare account: AccountService;
  @service declare pushNotification: PushNotificationService;

  updateIntervalMs = 10000;

  @tracked hasNews = false;
  @tracked listInvites: ListInvite[] = [];
  @tracked pings: Ping[] = [];

  @action async initialize() {
    this.pushNotification.initialize();
    setInterval(this.refresh, this.updateIntervalMs);
  }

  @action async refresh() {
    this.listInvites = (await this.store.findAll('list-invite')).slice();
    this.pings = (await this.store.findAll('ping')).slice();
    this.update();
  }

  @action update() {
    this.hasNews =
      (this.listInvites &&
        this.listInvites.filter((record) => !record.isDestroyed).length > 0) ||
      (this.pings &&
        this.pings.filter((record) => !record.isDestroyed).length > 0);
  }
}
