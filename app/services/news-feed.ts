import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import AccountService from './account';
import CustomStore from './store';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;
  @service declare account: AccountService;

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
    console.log('refreshing....');
    this.listInvites = (await this.store.findAll('list-invite')).slice();
    console.log(this.listInvites);
    this.update();
  }

  @action update() {
    this.hasNews =
      (this.listInvites &&
        this.listInvites.filter((record) => !record.isDestroyed).length > 0) ||
      false;
  }
}
