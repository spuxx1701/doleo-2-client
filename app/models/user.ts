import Model, { attr, belongsTo } from '@ember-data/model';
import Family from './family';

export default class User extends Model {
  @attr()
  declare displayName: string;

  @belongsTo('family', { async: false })
  declare family: Family;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
