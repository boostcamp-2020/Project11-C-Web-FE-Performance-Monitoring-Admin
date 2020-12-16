import React from 'react';
import styled from 'styled-components';

const StickDiv = styled.div`
  margin: 0 auto;
  margin-right: 0.2rem;
  background-color: #76ff03;
  width: 0.5rem;
  height: ${props => props.id};
  vertical-align: bottom;
  align-self: flex-end;
`;

const Stick = ({ ...props }) => {
  if (props.id === '0.1rem') {
    props.id = '1px';
  }
  return <StickDiv {...props} />;
};

export default Stick;
