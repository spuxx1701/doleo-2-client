import Component from '@glimmer/component';
import { action } from '@ember/object';
import ListInvite from 'doleo-2-client/models/list-invite';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import NewsFeedService from 'doleo-2-client/services/news-feed';
import CustomStore from 'doleo-2-client/services/custom-store';

export interface Args {
  invite: ListInvite;
}

export default class IncomingListInvite extends Component<Args> {
  @service declare store: CustomStore;
  @service declare newsFeed: NewsFeedService;

  declare args: Args;

  @tracked hidden = false;

  @action async accept() {
    this.hide();
    this.args.invite.accept = true;
    await this.args.invite.save();
    await this.args.invite.destroyRecord();
    this.newsFeed.update();
    this.store.findAll('list');
  }

  @action async reject() {
    this.hide();
    await this.args.invite.destroyRecord();
    this.newsFeed.update();
  }

  @action hide() {
    this.hidden = true;
  }
}
