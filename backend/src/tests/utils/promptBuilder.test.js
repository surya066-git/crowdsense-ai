import { buildSystemPrompt, buildUserPrompt } from '../../utils/promptBuilder.js';

describe('promptBuilder', () => {
  it('buildSystemPrompt returns string', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('You are an AI Stadium Navigation Assistant');
  });
  
  it('buildUserPrompt returns string with data', () => {
    const data = { bestGate: { gateName: 'Gate 1' } };
    const prompt = buildUserPrompt(data);
    expect(prompt).toContain('Gate 1');
    expect(prompt).toContain('Decision Engine Output to explain:');
  });
});
