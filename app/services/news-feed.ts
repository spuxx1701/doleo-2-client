import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import AccountService from './account';
import PushNotificationService from './push-notification';
import CustomStore from './custom-store';
import Ping from 'doleo-2-client/models/ping';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import LocalDataService from './local-data';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;
  @service declare account: AccountService;
  @service declare pushNotification: PushNotificationService;
  @service declare localData: LocalDataService;

  updateIntervalMs = 10000;

  @tracked hasNews = false;
  @tracked newVersion: string | undefined;
  @tracked listInvites: ListInvite[] = [];
  @tracked pings: Ping[] = [];

  @action async initialize() {
    this.pushNotification.initialize();
    setInterval(this.reload, this.updateIntervalMs);
  }

  @action async reload() {
    this.newVersion = this.localData.getUnencounteredVersion();
    this.listInvites = (await this.store.findAll('list-invite')).filter(
      (record) => !record.isDeleted
    );
    this.pings = (await this.store.findAll('ping')).filter(
      (record) => !record.isDeleted
    );
    this.update();
  }

  @action update() {
    this.listInvites = this.store
      .peekAll('list-invite')
      .filter((record) => !record.isDeleted);
    this.pings = this.store
      .peekAll('ping')
      .filter((record) => !record.isDeleted);
    this.hasNews =
      stringIsNotEmpty([this.newVersion]) ||
      this.listInvites.length > 0 ||
      this.pings.length > 0;
  }
}
