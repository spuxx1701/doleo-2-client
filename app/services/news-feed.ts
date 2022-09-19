import emberData__store from '@ember-data/store';
import { action } from '@ember/object';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ListInvite from 'doleo-2-client/models/list-invite';
import Ember from 'ember';

export default class NewsFeedService extends Service {
  @service declare store: emberData__store;

  @tracked hasNews = false;
  @tracked listInvites: Ember.ArrayProxy<ListInvite> | undefined;

  @action async refresh() {
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
