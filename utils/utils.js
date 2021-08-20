// if text is too long crop it and add ... on the end
export const cropText = (text, length) => {
  return `${text.substring(0, length)}${text.length >= length ? '...' : ''}`;
};

export const inputValidation = (email, fullName, password, password2) => {
  if (!email || !password || !fullName || !password2) {
    return 'Required fields are not filled';
  } // validation that both password are equal
  else if (password !== password2) {
    return 'Passwords do not match';
  } else return undefined;
};
