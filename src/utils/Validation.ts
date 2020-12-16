const isRightEmail = (inputValue: string): boolean => {
  const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]+\.[a-zA-Z]+$/i;
  return emailRegExp.test(inputValue);
};

export default { isRightEmail };
