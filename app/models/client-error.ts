import Model, { attr } from '@ember-data/model';

export default class ClientError extends Model {
  @attr()
  declare createdAt: string;

  @attr()
  declare message: string;

  @attr()
  declare stack: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    clientError: ClientError;
  }
}
