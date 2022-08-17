import Model, { attr, hasMany, SyncHasMany } from '@ember-data/model';
import ListEntry from './list-entry';

export default class List extends Model {
  @attr()
  declare displayName: string;

  @attr()
  declare iconName: string;

  @attr()
  declare hasAmounts: boolean;

  @attr()
  declare owner: any;

  @hasMany('list-entry', { async: false })
  declare entries: SyncHasMany<ListEntry>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    list: List;
  }
}
