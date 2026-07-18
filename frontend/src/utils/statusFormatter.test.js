import { formatStatusLabel, getStatusTone } from './statusFormatter';

vi.mock('../constants/status.js', () => ({
  STATUS_VARIANTS: {
    PENDING: 'PENDING',
    READY: 'READY',
    ACTIVE: 'ACTIVE',
    WARNING: 'WARNING',
    DANGER: 'DANGER',
  },
  STATUS_LABELS: {
    PENDING: 'Pending',
    READY: 'Ready',
    ACTIVE: 'Active',
    WARNING: 'Warning',
    DANGER: 'Danger',
  },
}));

describe('formatStatusLabel', () => {
  it('returns the correct label for a given status', () => {
    expect(formatStatusLabel('READY')).toBe('Ready');
  });

  it('returns the label for PENDING status if given status is unknown', () => {
    expect(formatStatusLabel('UNKNOWN')).toBe('Pending');
  });
});

describe('getStatusTone', () => {
  it('returns "success" for READY and ACTIVE', () => {
    expect(getStatusTone('READY')).toBe('success');
    expect(getStatusTone('ACTIVE')).toBe('success');
  });

  it('returns "warning" for WARNING and PENDING', () => {
    expect(getStatusTone('WARNING')).toBe('warning');
    expect(getStatusTone('PENDING')).toBe('warning');
  });

  it('returns "error" for DANGER', () => {
    expect(getStatusTone('DANGER')).toBe('error');
  });

  it('returns "default" for unknown statuses', () => {
    expect(getStatusTone('UNKNOWN')).toBe('default');
  });
});
