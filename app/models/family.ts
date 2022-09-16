import Model, { attr, hasMany, SyncHasMany } from '@ember-data/model';
import User from './user';

export default class Family extends Model {
  @attr()
  declare displayName: string;

  @hasMany('user', { async: false })
  declare members: SyncHasMany<User>;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    family: Family;
  }
}
