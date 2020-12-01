import React from 'react';
import styled from 'styled-components';

type inputProps = {
  defaultText: string;
};

const Input = ({ defaultText }: inputProps) => {
  return <CustomInput placeholder={defaultText} />;
};

const CustomInput = styled.input`
  width: 80%;
  height: 40px;

  margin: 10px auto;
  padding: 0;

  border-width: 1px;
  border-radius: 6px;
  outline: none;
`;

Input.defaultProps = {
  defaultText: 'input area',
};

export default Input;
