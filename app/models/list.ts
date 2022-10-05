import Model, { attr, hasMany, SyncHasMany } from '@ember-data/model';
import ListEntry from './list-entry';
import User from './user';

export default class List extends Model {
  @attr()
  declare displayName: string;

  @attr()
  declare iconName: string;

  @attr()
  declare usesCheck: boolean;

  @attr()
  declare hasAmounts: boolean;

  @attr()
  declare usesConfirmDelete: boolean;

  @attr()
  declare owner: User;

  @attr()
  declare members: User[];

  @hasMany('list-entry', { async: false, inverse: 'list' })
  declare entries: SyncHasMany<ListEntry>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    list: List;
  }
}
