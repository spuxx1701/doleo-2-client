import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import WebNotificationService from '../services/web-notification';

export default class IndexController extends Controller {
  @service declare webNotification: WebNotificationService;

  @action createNotification() {
    const title = 'Hello World';
    const message = 'I am a notification!';
    this.webNotification.create(title, message);
  }
}
