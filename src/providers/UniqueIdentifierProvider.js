import uuid from 'uuid/v4';

export default class UniqueIdentifierProvider {
  static getPrefixedUUID(prefix) {
    return `${prefix}-${uuid()}`;
  }
}
