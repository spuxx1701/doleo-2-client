import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';
import AccountService from 'doleo-2-client/services/account';
import NewsFeedService from 'doleo-2-client/services/news-feed';
import PushNotificationService from 'doleo-2-client/services/push-notification';

export default class IndexController extends Controller {
  @service declare pushNotification: PushNotificationService;
  @service declare manager: ManagerService;
  @service declare account: AccountService;
  @service declare newsFeed: NewsFeedService;

  get hasNews() {
    return this.newsFeed.hasNews;
  }
}
