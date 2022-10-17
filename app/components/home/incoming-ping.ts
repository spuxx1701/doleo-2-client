import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import NewsFeedService from 'doleo-2-client/services/news-feed';
import CustomStore from 'doleo-2-client/services/custom-store';
import Ping from 'doleo-2-client/models/ping';
import { tracked } from '@glimmer/tracking';

export interface Args {
  ping: Ping;
}

export default class IncomingListInvite extends Component<Args> {
  @service declare store: CustomStore;
  @service declare newsFeed: NewsFeedService;

  @tracked hidden = false;

  declare args: Args;

  @action async delete() {
    this.hide();
    await this.args.ping.destroyRecord();
    this.newsFeed.update();
  }

  @action hide() {
    this.hidden = true;
  }
}
