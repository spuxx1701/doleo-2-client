import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class FamilySerializer extends JSONSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    users: {
      serialize: 'ids',
      deserialize: 'records',
    },
  };
}
