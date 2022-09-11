import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import WebNotificationService from 'doleo-2-client/services/web-notification';
import ManagerService from 'doleo-2-client/services/manager';

export default class IndexController extends Controller {
  @service declare webNotification: WebNotificationService;
  @service declare manager: ManagerService;

  @action createNotification() {
    const title = 'Hello World';
    const message = 'I am a notification!';
    this.webNotification.create(title, message);
  }
}
