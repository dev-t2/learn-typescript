export const validateEmail = (email: string) => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;

  return regex.test(email);
};

export const removeWhiteSpace = (text: string) => {
  const regex = /\s/g;

  return text.replace(regex, '');
};
