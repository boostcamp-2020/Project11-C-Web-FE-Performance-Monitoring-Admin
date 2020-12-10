import React from 'react';
import styled from 'styled-components';

const PlatformRoot = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.isSelected && 'rgba(255, 255, 255, 0.5);'};
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

const PlatformImage = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: contain;
`;

const PlatformName = styled.span`
  padding: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
`;

const Platform = ({ platform, selectedPlatform, setSelectedPlatform }) => {
  const clickPlatform = () => {
    const newSelectedPlatform = selectedPlatform === platform ? null : platform;
    setSelectedPlatform(newSelectedPlatform);
  };

  return (
    <PlatformRoot
      onClick={clickPlatform}
      isSelected={platform === selectedPlatform}
    >
      <PlatformImage src={`../../../public/png/${platform}.png`} />
      <PlatformName>{platform}</PlatformName>
    </PlatformRoot>
  );
};

export default Platform;
