import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import WebNotificationService from 'doleo-2-client/services/web-notification';
import ManagerService from 'doleo-2-client/services/manager';
import AccountService from 'doleo-2-client/services/account';

export default class IndexController extends Controller {
  @service declare webNotification: WebNotificationService;
  @service declare manager: ManagerService;
  @service declare account: AccountService;
}
