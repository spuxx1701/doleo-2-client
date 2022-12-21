import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import NewsFeedService from 'doleo-2-client/services/news-feed';
import LocalDataService from 'doleo-2-client/services/local-data';

export interface Args {
  version: string;
}

export default class IncomingListInvite extends Component<Args> {
  @service declare newsFeed: NewsFeedService;
  @service declare localData: LocalDataService;

  declare args: Args;

  @tracked hidden = false;

  @action async showChangesAndClearCache() {
    this.hide();
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(async (name) => {
          await caches.delete(name);
        });
      });
      window.location.href = window.location.href + '/about';
    }
  }

  @action async hide() {
    this.localData.setEncounteredVersion();
    this.hidden = true;
  }
}
