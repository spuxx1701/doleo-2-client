import Model, { attr } from '@ember-data/model';

export default class Account extends Model {
  @attr()
  declare displayName: string;

  @attr()
  declare selectedDesign: number;

  @attr()
  declare email: string;

  @attr()
  declare password: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    account: Account;
  }
}
