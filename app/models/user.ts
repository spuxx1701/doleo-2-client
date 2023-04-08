import Model, { attr, belongsTo } from '@ember-data/model';
import Family from './family';
import { memberAction } from 'ember-api-actions';

export default class User extends Model {
  @attr()
  declare displayName: string;

  @belongsTo('family', { async: false, inverse: 'members' })
  declare family: Family;

  /**
   * Invites the user to the specified list.
   * @param {string} body.list The list id.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  declare inviteToList: Function;

  /**
   * Pings the user.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  declare ping: Function;
}

User.prototype.inviteToList = memberAction({
  path: 'inviteToList',
  type: 'POST',
});

User.prototype.ping = memberAction({
  path: 'ping',
  type: 'POST',
});

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
