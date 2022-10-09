import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ManagerService from 'doleo-2-client/services/manager';
import CustomStore from 'doleo-2-client/services/store';

export default class AuthenticatedController extends Controller {
  @service declare store: CustomStore;
  @service declare manager: ManagerService;
  @service declare session: any;

  declare model: { lists: any };

  @tracked sidenavExpanded = false;

  get sidenavExpandWidth(): string {
    return getComputedStyle(document.documentElement).getPropertyValue(
      '--sidenav-max-width'
    );
  }

  @action toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
    this.updateSidenav();
  }

  @action goToPage(route: string) {
    this.manager.goTo(route);
    this.toggleSidenav();
  }

  @action goToList(id: string) {
    this.goToPage(`/list/${id}`);
  }

  updateSidenav() {
    const sidenav = document.getElementById('sidenav');
    if (!sidenav) {
      throw new Error('Unable to find sidenav.');
    }
    if (this.sidenavExpanded) {
      sidenav.style.width = this.sidenavExpandWidth;
    } else {
      sidenav.style.width = '0';
    }
  }

  @action synchronize() {
    // TODO: Implement me
  }

  get hasUnsyncedChanges() {
    return this.store.hasUnsyncedChanges;
  }

  @action logout() {
    this.session.invalidate();
  }
}
