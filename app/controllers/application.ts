import Controller from '@ember/controller';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ManagerService from 'doleo-2-client/services/manager';

export default class ApplicationController extends Controller {
  @service declare store: Store;
  @service declare manager: ManagerService;

  declare model: { lists: any };

  @tracked sidenavExpanded = false;
  sidenavExpandWidth = '300px';

  @action toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
    this.updateSidenav();
  }

  @action logout() {
    console.log('Implement me!');
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
}
