import { jest } from '@jest/globals';
import { Buffer } from 'buffer';

jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn() }
}));

const { parseCSV, parseJSON, validateFileContext } = await import('../../services/parser.service.js');

describe('Parser Service', () => {
  it('should parse valid CSV', async () => {
    const csvStr = 'Gate ID,Crowd Density,Timestamp\ng1,High,1234';
    const result = await parseCSV(Buffer.from(csvStr), 'crowd.csv');
    expect(result.length).toBe(1);
    expect(result[0]['Gate ID']).toBe('g1');
  });

  it('should reject CSV with missing columns', async () => {
    const csvStr = 'Gate ID,Timestamp\ng1,1234'; // missing Crowd Density
    await expect(parseCSV(Buffer.from(csvStr), 'crowd.csv')).rejects.toThrow('Missing required columns');
  });

  it('should reject empty CSV', async () => {
    const csvStr = 'Gate ID,Crowd Density,Timestamp\n';
    await expect(parseCSV(Buffer.from(csvStr), 'crowd.csv')).rejects.toThrow('empty or has invalid data format');
  });

  it('should parse valid JSON', async () => {
    const jsonStr = JSON.stringify({ Temperature: 70, Rain: "0%", Wind: "0mph", Visibility: "Clear" });
    const result = await parseJSON(Buffer.from(jsonStr), 'weather.json');
    expect(result.Temperature).toBe(70);
  });

  it('should reject JSON with missing keys', async () => {
    const jsonStr = JSON.stringify({ Temperature: 70 });
    await expect(parseJSON(Buffer.from(jsonStr), 'weather.json')).rejects.toThrow('Missing required keys');
  });

  it('should reject malformed JSON', async () => {
    const jsonStr = '{ bad_json ';
    await expect(parseJSON(Buffer.from(jsonStr), 'weather.json')).rejects.toThrow('Malformed JSON');
  });

  it('validateFileContext should validate CSV', async () => {
    const file = { originalname: 'crowd.csv', buffer: Buffer.from('Gate ID,Crowd Density,Timestamp\ng1,High,1234') };
    const res = await validateFileContext(file);
    expect(res).toBe(true);
  });

  it('validateFileContext should reject unsupported CSV', async () => {
    const file = { originalname: 'unsupported.csv', buffer: Buffer.from('') };
    await expect(validateFileContext(file)).rejects.toThrow('Unsupported CSV file');
  });

  it('validateFileContext should validate JSON', async () => {
    const file = { originalname: 'weather.json', buffer: Buffer.from(JSON.stringify({ Temperature: 70, Rain: "0%", Wind: "0mph", Visibility: "Clear" })) };
    const res = await validateFileContext(file);
    expect(res).toBe(true);
  });

  it('validateFileContext should reject unsupported JSON', async () => {
    const file = { originalname: 'data.json', buffer: Buffer.from('{}') };
    await expect(validateFileContext(file)).rejects.toThrow('Unsupported JSON file');
  });

  it('validateFileContext should reject other extensions', async () => {
    const file = { originalname: 'test.txt', buffer: Buffer.from('') };
    await expect(validateFileContext(file)).rejects.toThrow('Unsupported file extension');
  });
});
