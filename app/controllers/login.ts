import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ManagerService from 'doleo-2-client/services/manager';

export default class LoginController extends Controller {
  @service declare manager: ManagerService;
  @service declare session: any;
  @service declare notifications: any;

  @tracked email = '';
  @tracked password = '';

  @action submit(event: SubmitEvent) {
    event.preventDefault();
    this.authenticate();
  }

  async authenticate() {
    try {
      await this.session.authenticate(
        'authenticator:oauth2',
        this.email,
        this.password
      );
    } catch (error) {
      this.notifications.error('Das hat leider nicht geklappt!');
      throw error;
    }
    if (this.session.isAuthenticated) {
      this.password = '';
      this.manager.goTo('/');
    }
  }
}
