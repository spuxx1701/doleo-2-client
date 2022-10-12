import Model, { attr, belongsTo } from '@ember-data/model';
import Family from './family';
import { memberAction } from 'ember-api-actions';

export default class User extends Model {
  @attr()
  declare displayName: string;

  @belongsTo('family', { async: false, inverse: 'members' })
  declare family: Family;

  /**
   * @param {string} options
   */
  declare inviteToList: Function;
}

User.prototype.inviteToList = memberAction({
  path: 'inviteToList',
  type: 'POST',
});

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
