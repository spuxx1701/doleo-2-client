import Model, { attr } from '@ember-data/model';
import Family from './family';

export default class Account extends Model {
  @attr()
  declare displayName: string;

  @attr()
  declare selectedDesign: number;

  @attr()
  declare email: string;

  @attr()
  declare password: string;

  @attr()
  declare family: Family;

  @attr()
  declare enableTelemetry?: boolean; // Local storage property
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    account: Account;
  }
}
