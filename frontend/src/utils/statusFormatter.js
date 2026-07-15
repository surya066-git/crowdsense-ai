import { STATUS_LABELS, STATUS_VARIANTS } from '../constants/status.js';

export const formatStatusLabel = (status) =>
  STATUS_LABELS[status] || STATUS_LABELS[STATUS_VARIANTS.PENDING];

export const getStatusTone = (status) => {
  if ([STATUS_VARIANTS.READY, STATUS_VARIANTS.ACTIVE].includes(status)) {
    return 'success';
  }

  if (status === STATUS_VARIANTS.WARNING || status === STATUS_VARIANTS.PENDING) {
    return 'warning';
  }

  if (status === STATUS_VARIANTS.DANGER) {
    return 'error';
  }

  return 'default';
};
