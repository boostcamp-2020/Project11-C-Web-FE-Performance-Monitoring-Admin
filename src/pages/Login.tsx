// eslint-disable-next-line no-use-before-define
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/no-unresolved
import OauthButton from '@components/login/OauthButton';

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;

  width: 400px;
  height: 360px;

  margin: 0 auto;
  margin-top: 100px;
  padding: 10px;

  border: solid;
  border-width: 1px;
  border-style: auto;
  border-radius: 5px;
  border-color: #8f5ba0;
`;

const Login: React.FC = () => {
  const oauthUrl = 'http://localhost:3000/oauth';
  const googleClick = () => {
    window.location.href = `${oauthUrl}/google`;
  };

  const githubClick = () => {
    window.location.href = `${oauthUrl}/github`;
  };

  const naverClick = () => {
    window.location.href = `${oauthUrl}/naver`;
  };

  return (
    <LoginModal>
      <OauthButton defaultText="Google" onClick={googleClick} />
      <OauthButton defaultText="Github" onClick={githubClick} />
      <OauthButton defaultText="Naver" onClick={naverClick} />
    </LoginModal>
  );
};

export default Login;
