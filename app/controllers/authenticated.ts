import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ManagerService from 'doleo-2-client/services/manager';
import CustomStore from 'doleo-2-client/services/custom-store';
import NewsFeedService from 'doleo-2-client/services/news-feed';
import List from 'doleo-2-client/models/list';

export default class AuthenticatedController extends Controller {
  @service declare store: CustomStore;
  @service declare manager: ManagerService;
  @service declare session: any;
  @service declare newsFeed: NewsFeedService;

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

  @action sync() {
    this.store.sync();
    this.newsFeed.reload();
  }

  get lists() {
    return this.model.lists
      .toArray()
      .sort((a: List, b: List) => a.displayName.localeCompare(b.displayName));
  }

  get isSyncing() {
    return this.store.isSyncing;
  }

  get hasUnsyncedChanges() {
    return this.store.hasUnsyncedChanges;
  }

  @action logout() {
    this.session.invalidate();
  }
}
