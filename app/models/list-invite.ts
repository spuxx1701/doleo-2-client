import Model, { attr } from '@ember-data/model';
import List from './list';
import User from './user';

export default class ListInvite extends Model {
  @attr()
  declare list: List;

  @attr()
  declare recipient: User;

  @attr()
  declare sender: User;

  @attr()
  declare notificationSent: boolean;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'list-invite': ListInvite;
  }
}
