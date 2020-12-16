import React from 'react';
import styled from 'styled-components';

const ItemRoot = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  background-color: rgba(100, 100, 100, 0.1);
`;

const PlatformItem = ({ platform, icon }) => {
  return (
    <ItemRoot>
      <img src={'../../../public/png/' + icon} width="50" height="50" />
      <p>{platform}</p>
    </ItemRoot>
  );
};

export default PlatformItem;
