import React, { useState } from 'react';
import styled from 'styled-components';
import Platform from '@components/project-new/Platform';

const PlatformsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 1rem 0;
`;

const Platforms = ({ selectedPlatform, setSelectedPlatform }) => {
  const [platforms, usePlatforms] = useState([
    'Node',
    'Express',
    'React',
    'Vue',
    'JavaScript',
  ]);

  return (
    <>
      <p>Choose a platform</p>
      <PlatformsWrapper>
        {platforms.map(platform => (
          <Platform
            key={platform}
            platform={platform}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        ))}
      </PlatformsWrapper>
    </>
  );
};

export default Platforms;
