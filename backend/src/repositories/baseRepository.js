export class BaseRepository {
  constructor(collectionName) {
    if (!collectionName) {
      throw new Error('A collection name is required for BaseRepository.');
    }

    this.collectionName = collectionName;
  }

  getCollectionName() {
    return this.collectionName;
  }
}
