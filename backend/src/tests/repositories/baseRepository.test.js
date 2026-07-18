import { BaseRepository } from '../../repositories/baseRepository.js';

describe('BaseRepository', () => {
  it('should initialize with a collection name', () => {
    const repo = new BaseRepository('test_collection');
    expect(repo.getCollectionName()).toBe('test_collection');
  });

  it('should throw an error if no collection name is provided', () => {
    expect(() => new BaseRepository()).toThrow('A collection name is required for BaseRepository.');
  });
});
