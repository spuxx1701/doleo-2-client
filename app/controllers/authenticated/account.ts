import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Account from 'doleo-2-client/models/account';
import ManagerService from 'doleo-2-client/services/manager';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import AccountService from 'doleo-2-client/services/account';
import ModalService from 'doleo-2-client/services/modal';
import PushNotificationService from 'doleo-2-client/services/push-notification';
import LocalDataService from 'doleo-2-client/services/local-data';

export default class AccountController extends Controller {
  @service declare manager: ManagerService;
  @service declare account: AccountService;
  @service declare notifications: any;
  @service declare modal: ModalService;
  @service declare pushNotification: PushNotificationService;
  @service declare localData: LocalDataService;

  declare model: Account;

  @tracked displayName = this.model.displayName;
  @tracked email = this.model.email;
  @tracked password = '';
  @tracked enableTelemetry = this.model.enableTelemetry;

  @action changeDisplayName() {
    if (!this.validateDisplayName(this.displayName)) {
      this.displayName = this.model.displayName;
      return;
    }
    this.model.displayName = this.displayName;
    this.account.save();
  }

  validateDisplayName(input: string) {
    if (!stringIsNotEmpty([input])) {
      this.notifications.error('Dein Anzeigename darf nicht leer sein.');
      return false;
    }
    if (input.length > 30) {
      this.notifications.error(
        'Dein Anzeigename darf nicht länger als 30 Zeichen sein.'
      );
      return false;
    }
    return true;
  }

  @action changeEmail() {
    if (!this.validateEmail(this.email)) {
      this.email = this.model.email;
      return;
    }
    this.modal.confirm({
      title: 'Email ändern',
      text: 'Du bist dabei, Deine Email zu ändern. Deine Email ist auch Dein Anmeldename und ist zum Zurücksetzen Deines Passworts notwendig. Möchtest Du fortfahren?',
      noLabel: 'Abbrechen',
      onYesClick: () => {
        this.modal.hide();
        this.model.email = this.email;
        this.account.save();
      },
      onNoClick: () => {
        this.modal.hide();
        this.model.email = this.email;
      },
    });
  }

  validateEmail(input: string) {
    if (!stringIsNotEmpty([input])) {
      this.notifications.error('Deine Email darf nicht leer sein.');
      return false;
    }
    if (!this.account.patternEmail.test(input)) {
      this.notifications.error('Bitte gib eine gültige Email ein.');
      return false;
    }
    if (input.length < 5) {
      this.notifications.error(
        'Deine Email muss mindestens fünf Zeichen lang sein.'
      );
      return false;
    }
    if (input.length > 50) {
      this.notifications.error(
        'Deine Email darf nicht länger als 50 Zeichen sein.'
      );
      return false;
    }
    return true;
  }

  @action changePassword() {
    if (!this.validatePassword(this.password)) {
      this.password = this.model.password;
      return;
    }
    this.modal.confirm({
      title: 'Passwort ändern',
      text: 'Du bist dabei, Dein Passwort zu ändern. Möchtest Du fortfahren?',
      noLabel: 'Abbrechen',
      onYesClick: this.onChangePasswordConfirm,
      onNoClick: this.onChangePasswordCancel,
    });
  }

  @action onChangePasswordConfirm() {
    this.model.password = this.password;
    this.password = '';
    this.modal.hide();
    this.account.save();
  }

  @action onChangePasswordCancel() {
    this.password = '';
    this.modal.hide();
  }

  validatePassword(input: string) {
    if (!stringIsNotEmpty([input])) {
      this.notifications.error('Dein Passwort darf nicht leer sein.');
      return false;
    }
    if (input.length > 255) {
      this.notifications.error('Dein Passwort darf nicht länger als 255 sein.');
      return false;
    }
    return true;
  }

  get hasActivePushSubscription() {
    return this.pushNotification.pushSubscription ? true : false;
  }

  @action togglePushNotifications(event: any) {
    if (event.target.checked) {
      this.subscribePushNotifications(event.target);
    } else {
      this.unsubscribePushNotifications(event.target);
    }
  }

  subscribePushNotifications(toggle: any) {
    this.modal.confirm({
      icon: 'comment',
      title: 'Push-Nachrichten aktivieren',
      text: 'Wenn Du Push-Nachrichten für dieses Gerät aktivierst, erfährst Du auch dann von Neuigkeiten, wenn Du die App gerade nicht nutzt. Möchtest Du fortfahren?',
      noLabel: 'Abbrechen',
      onYesClick: () => {
        this.modal.hide();
        this.pushNotification.subscribe();
      },
      onNoClick: () => {
        this.modal.hide();
        toggle.checked = false;
      },
    });
  }

  unsubscribePushNotifications(toggle: any) {
    this.modal.confirm({
      icon: 'comment-slash',
      title: 'Push-Nachrichten deaktivieren',
      text: 'Du wirst keine Push-Nachrichten auf diesem Gerät mehr erhalten. Du kannst Push-Nachrichten jederzeit wieder aktivieren. Möchtest Du fortfahren?',
      noLabel: 'Abbrechen',
      onYesClick: () => {
        this.modal.hide();
        this.pushNotification.unsubscribe();
      },
      onNoClick: () => {
        this.modal.hide();
        toggle.checked = true;
      },
    });
  }

  @action toggleEnableTelemetry(event: any) {
    this.localData.setEnableTelemetry(event.target.checked);
    this.enableTelemetry = event.target.checked;
  }
}
