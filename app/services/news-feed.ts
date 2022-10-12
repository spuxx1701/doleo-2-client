import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import Ember from 'ember';
import CustomStore from './store';

export default class NewsFeedService extends Service {
  @service declare store: CustomStore;

  @tracked hasNews = false;
  @tracked listInvites: Ember.ArrayProxy<ListInvite> | undefined;

  @action async refresh() {
    // Force a complete refresh on list-invites so we don't accidentally display invites
    // that were created in this session
    this.store.unloadAll('list-invite');
    this.listInvites = await this.store.findAll('list-invite');
    this.update();
  }

  @action update() {
    this.hasNews =
      (this.listInvites &&
        this.listInvites.filter((record) => !record.isDestroyed).length > 0) ||
      false;
  }
}
