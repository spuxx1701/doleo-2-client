import Model, { attr } from '@ember-data/model';
import User from './user';

export default class Ping extends Model {
  @attr()
  declare sender: User;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    ping: Ping;
  }
}
