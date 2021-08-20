// if text is too long crop it and add ... on the end
export const cropText = (text, length) => {
  return `${text.substring(0, length)}${text.length >= length ? '...' : ''}`;
};
