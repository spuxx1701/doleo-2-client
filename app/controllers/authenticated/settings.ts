import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Profile } from 'doleo-2-client';
import ManagerService from 'doleo-2-client/services/manager';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';

export default class ListController extends Controller {
  @service declare manager: ManagerService;
  @service declare notifications: any;

  declare model: Profile;

  @tracked selectedDesign = this.model.selectedDesign;
  @tracked displayName = this.model.displayName;
  @tracked email = this.model.email;
  @tracked password = 'password';

  @action changeDesign() {}

  @action changeDisplayName() {
    if (!this.validateDisplayName(this.displayName)) {
      this.displayName = this.model.displayName;
      return;
    }
    const profile = {
      ...this.model,
      displayName: this.displayName,
    } as Profile;
    this.updateProfile(profile);
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

  updateProfile(profile: Profile) {
    console.log(profile);
    this.notifications.success('Änderungen gespeichert.');
  }
}
