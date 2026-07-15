export const STATUS_VARIANTS = Object.freeze({
  READY: 'ready',
  ACTIVE: 'active',
  WARNING: 'warning',
  DANGER: 'danger',
  DISABLED: 'disabled',
  PENDING: 'pending',
});

export const STATUS_LABELS = Object.freeze({
  [STATUS_VARIANTS.READY]: 'Ready',
  [STATUS_VARIANTS.ACTIVE]: 'Active',
  [STATUS_VARIANTS.WARNING]: 'Warning',
  [STATUS_VARIANTS.DANGER]: 'Danger',
  [STATUS_VARIANTS.DISABLED]: 'Disabled',
  [STATUS_VARIANTS.PENDING]: 'Pending',
});
