import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class UserSerializer extends JSONSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    family: {
      serialize: 'ids',
      deserialize: 'records',
    },
  };
}
