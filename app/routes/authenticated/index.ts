import Route from '@ember/routing/route';
import { service } from '@ember/service';
import NewsFeedService from 'doleo-2-client/services/news-feed';

export default class SettingsRoute extends Route {
  @service declare newsFeed: NewsFeedService;

  async model() {
    await this.newsFeed.refresh();
  }
}
