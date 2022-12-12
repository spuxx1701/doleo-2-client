import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import LocalDataService from 'doleo-2-client/services/local-data';
import ManagerService from 'doleo-2-client/services/manager';
import NewsFeedService from 'doleo-2-client/services/news-feed';

export default class HomeRoute extends Route {
  @service declare manager: ManagerService;
  @service declare newsFeed: NewsFeedService;
  @service declare localData: LocalDataService;

  async model() {
    await this.newsFeed.reload();
  }

  @action async didTransition(): Promise<void> {
    await this.manager.sleep(1000);
    this.localData.initialize();
  }
}
