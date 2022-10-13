import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import AccountService from './account';
import CustomStore from './store';
import WebNotificationService from './web-notification';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;
  @service declare account: AccountService;
  @service declare webNotification: WebNotificationService;

  worker: Worker | undefined;
  updateIntervalMs = 10000;

  @tracked hasNews = false;
  @tracked listInvites: ListInvite[] = [];

  @action initialize() {
    this.createWorker();
  }

  @action createWorker(): Worker {
    this.worker = new Worker(
      `data:text/javascript,
      setInterval(() => {
        postMessage('Updating newsfeed.');
      }, ${this.updateIntervalMs});`
    );
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
        const result = await this.webNotification.create(
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
