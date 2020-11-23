import React from 'react';
import styled from 'styled-components';

type textProps = {
  defaultText: string;
};

const Text = ({ defaultText }: textProps) => {
  return <CustomP>{defaultText}</CustomP>;
};

const CustomP = styled.p`
  width: 80%;

  margin: 10px auto;
  margin-bottom: 0;
`;

Text.textProps = {
  defaultText: '?',
};

export default Text;
