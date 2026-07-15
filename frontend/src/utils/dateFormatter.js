export const formatDate = (value, locale = 'en-US') => {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};
