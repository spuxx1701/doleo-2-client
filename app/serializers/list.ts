import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class ListSerializer extends JSONSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    entries: {
      serialize: 'records',
      deserialize: 'records',
    },
  };
}
