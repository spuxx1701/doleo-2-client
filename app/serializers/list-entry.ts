import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class ListEntrySerializer extends JSONSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    list: {
      serialize: 'ids',
      deserialize: 'records',
    },
  };
}
