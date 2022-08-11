import Model, { attr } from '@ember-data/model';

export default class List extends Model {
  @attr()
  declare displayName: string;

  @attr()
  declare iconName: string;

  @attr()
  declare hasAmounts: boolean;

  @attr()
  declare ownerId: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    list: List;
  }
}
