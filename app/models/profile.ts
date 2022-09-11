import Model, { attr, belongsTo } from '@ember-data/model';
import Family from './family';

export default class Profile extends Model {
  @attr()
  declare displayName: string;

  @attr()
  declare selectedDesign: number;

  @attr()
  declare email: string;

  @attr()
  declare password: string;

  // @belongsTo('family', { async: false })
  // declare family: Family;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    profile: Profile;
  }
}
