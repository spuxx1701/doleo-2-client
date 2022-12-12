import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';
import NewsFeedService from 'doleo-2-client/services/news-feed';

export default class HomeRoute extends Route {
  @service declare manager: ManagerService;
  @service declare newsFeed: NewsFeedService;

  async model() {
    await this.newsFeed.reload();
  }
}
