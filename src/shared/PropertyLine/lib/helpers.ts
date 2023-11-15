export const parsePropertyLineInput = (
  value: string | string[] | undefined
) => {
  if (Array.isArray(value)) {
    value = value.join(', ');
  }

  return value ?? '--';
};
