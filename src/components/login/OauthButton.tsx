import React from 'react';
import styled from 'styled-components';

type buttonProps = {
  defaultText: string;
  onClick: () => void;
};

const OauthButton = ({ defaultText, onClick }: buttonProps) => {
  const oauthClick = () => onClick();
  return (
    <OauthButtonStyle onClick={oauthClick}>{defaultText}</OauthButtonStyle>
  );
};

const OauthButtonStyle = styled.button`
  width: 250px;
  height: 40px;

  margin: 10px auto;
  padding: 0;

  border-width: 1px;
  border-radius: 6px;
  outline: none;

  background-color: #fafafa;
`;

OauthButton.defaultProps = {
  defaultText: 'Oauth Button',
};

export default OauthButton;
