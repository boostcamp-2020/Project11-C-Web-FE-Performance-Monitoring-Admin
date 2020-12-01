import React from 'react';
import styled from 'styled-components';

type buttonProps = {
  defaultText: string;
  onClick: () => void;
};

const SignButton = ({ defaultText, onClick }: buttonProps) => {
  const SignClick = () => onClick();
  return <SignButtonStyle onClick={SignClick}>{defaultText}</SignButtonStyle>;
};

const SignButtonStyle = styled.button`
  width: 81%;
  height: 40px;

  margin: 10px auto;
  padding: 0;

  border-width: 1px;
  border-radius: 6px;
  outline: none;

  color: white;
  background-color: #8f5ba0;
`;

SignButton.defaultProps = {
  defaultText: 'Sign Button',
};

export default SignButton;
