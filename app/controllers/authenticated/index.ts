import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import WebNotificationService from 'doleo-2-client/services/web-notification';

export default class IndexController extends Controller {
  @service declare webNotification: WebNotificationService;
  @service declare session: any;

  @action createNotification() {
    console.log(this.session.currentSession);
    const title = 'Hello World';
    const message = 'I am a notification!';
    this.webNotification.create(title, message);
  }
}
