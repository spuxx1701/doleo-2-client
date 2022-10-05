import Model, { attr, belongsTo } from '@ember-data/model';
import List from './list';

export default class ListEntry extends Model {
  @attr()
  declare text: string;

  @attr()
  declare amount: number;

  @attr()
  declare isChecked?: boolean;

  @belongsTo('list', { async: false, inverse: 'entries' })
  declare list: List;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'list-entry': ListEntry;
  }
}
