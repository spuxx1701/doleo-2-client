import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class ListInviteSerializer extends JSONSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    list: {
      serialize: 'ids',
      deserialize: 'records',
    },
    sender: {
      serialize: 'ids',
      deserialize: 'records',
    },
    recipient: {
      serialize: 'ids',
      deserialize: 'records',
    },
  };
}
