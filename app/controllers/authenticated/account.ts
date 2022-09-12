import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Account from 'doleo-2-client/models/account';
import ManagerService from 'doleo-2-client/services/manager';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import AccountService from 'doleo-2-client/services/account';
import ModalService from 'doleo-2-client/services/modal';

export default class AccountController extends Controller {
  @service declare manager: ManagerService;
  @service declare account: AccountService;
  @service declare notifications: any;
  @service declare modal: ModalService;

  declare model: Account;

  @tracked displayName = this.model.displayName;
  @tracked email = this.model.email;
  @tracked password = '';

  emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/;

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
      title: 'Passwort ändern',
      text: 'Du bist dabei, Deine Email zu ändern. Deine Email ist auch Dein Anmeldename. Möchtest Du fortfahren?',
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
    if (!this.emailPattern.test(input)) {
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

  /**
   * Checks a password for it's complexity and security.
   * @param input The password to checj.
   * @returns The compexity value (0-3)
   */
  checkPasswordComplexity(input: string) {
    let complexity = 0;
    const length = input.length;
    if (stringIsNotEmpty([input])) {
      let variety = 0;
      if (input.match(/[a-z]/)) variety++; // does the password have lowercase letters?
      if (input.match(/[A-Z]/)) variety++; // does the password have uppercase letters?
      if (input.match(/\d/)) variety++; // does the password have digits?
      if (input.match(/[!@#$%&*()-+=^]/)) variety++; // does the password have special characters?
      if (length >= 21 && variety > 2) complexity = 4;
      else if (length >= 11 && length <= 20 && variety > 2) complexity = 3;
      else if (length >= 10 && variety === 2) complexity = 2;
      else complexity = 1;
    }
    return complexity;
  }

  get secBarOneHighlighted() {
    const compexity = this.checkPasswordComplexity(this.password);
    switch (compexity) {
      case 1:
        return 'bg-color-error';
      case 2:
        return 'bg-color-warning';
      case 3:
        return 'bg-color-success';
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }
  get secBarTwoHighlighted() {
    const compexity = this.checkPasswordComplexity(this.password);
    switch (compexity) {
      case 2:
        return 'bg-color-warning';
      case 3:
        return 'bg-color-success';
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }
  get secBarThreeHighlighted() {
    const compexity = this.checkPasswordComplexity(this.password);
    switch (compexity) {
      case 3:
        return 'bg-color-success';
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }
  get secBarFourHighlighted() {
    const compexity = this.checkPasswordComplexity(this.password);
    switch (compexity) {
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }
}
