import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import AccountService from './account';
import PushNotificationService from './push-notification';
import CustomStore from './custom-store';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;
  @service declare account: AccountService;
  @service declare pushNotification: PushNotificationService;

  worker: Worker | undefined;
  updateIntervalMs = 10000;

  @tracked hasNews = false;
  @tracked listInvites: ListInvite[] = [];

  @action async initialize() {
    this.pushNotification.initialize();
  }

  @action createWorker(): Worker {
    this.worker = new Worker(
      `data:text/javascript,
      setInterval(() => {
        postMessage('Updating newsfeed.');
      }, ${this.updateIntervalMs});`
    );
    this.worker;
    this.worker.onmessage = () => {
      this.refresh();
    };
    return this.worker;
  }

  @action async refresh() {
    this.listInvites = (await this.store.findAll('list-invite')).slice();
    this.update();
    this.sendWebNotifications();
  }

  @action update() {
    this.hasNews =
      (this.listInvites &&
        this.listInvites.filter((record) => !record.isDestroyed).length > 0) ||
      false;
  }

  @action async sendWebNotifications() {
    for (const listInvite of this.listInvites) {
      if (!listInvite.notificationSent) {
        const result = await this.pushNotification.create(
          'Neue Listeneinladung',
          `${listInvite.sender.displayName} hat Dich zu einer Liste eingeladen.`
        );
        if (result) {
          listInvite.notificationSent = true;
          this.store.trySave(listInvite);
        }
      }
    }
  }
}
