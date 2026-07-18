import { STATUS_VARIANTS, STATUS_LABELS } from './status';

describe('status constants', () => {
  describe('STATUS_VARIANTS', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(STATUS_VARIANTS)).toBe(true);
    });

    it('should have all expected variants', () => {
      expect(STATUS_VARIANTS).toEqual({
        READY: 'ready',
        ACTIVE: 'active',
        WARNING: 'warning',
        DANGER: 'danger',
        DISABLED: 'disabled',
        PENDING: 'pending',
      });
    });
  });

  describe('STATUS_LABELS', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(STATUS_LABELS)).toBe(true);
    });

    it('should map variants to correct labels', () => {
      expect(STATUS_LABELS[STATUS_VARIANTS.READY]).toBe('Ready');
      expect(STATUS_LABELS[STATUS_VARIANTS.ACTIVE]).toBe('Active');
      expect(STATUS_LABELS[STATUS_VARIANTS.WARNING]).toBe('Warning');
      expect(STATUS_LABELS[STATUS_VARIANTS.DANGER]).toBe('Danger');
      expect(STATUS_LABELS[STATUS_VARIANTS.DISABLED]).toBe('Disabled');
      expect(STATUS_LABELS[STATUS_VARIANTS.PENDING]).toBe('Pending');
    });

    it('should have the same number of entries as STATUS_VARIANTS', () => {
      expect(Object.keys(STATUS_LABELS).length).toBe(Object.keys(STATUS_VARIANTS).length);
    });
  });
});
