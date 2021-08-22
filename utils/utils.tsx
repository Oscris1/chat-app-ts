// if text is too long crop it and add ... on the end
export const cropText = (text, length) => {
  return `${text.substring(0, length)}${text.length >= length ? '...' : ''}`;
};

export const inputValidation = (email, fullName, password, password2) => {
  // email regex
  const validateEmailExpression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Minimum eight characters, at least one letter and one number:
  const validatePasswordExpression = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;

  // checking that the fields are not empty
  if (!email || !password || !fullName || !password2) {
    return 'Required fields are not filled';
  } // email validation
  else if (!validateEmailExpression.test(email)) {
    return 'The e-mail is invalid';
  } // password validation
  else if (!validatePasswordExpression.test(password)) {
    return `Weak password:\nMinimum eight characters, at least one letter and one number are required`;
  } // validation that both password are equal
  else if (password !== password2) {
    return 'Passwords do not match';
  } else return undefined;
};
