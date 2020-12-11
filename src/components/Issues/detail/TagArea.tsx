import React from 'react';
import styled from 'styled-components';

const TagContainer = styled.div``;

const TagArea = (props: { tags: {} }) => {
  const { tags } = props;
  const tagArr = Object.keys(tags).map(key => [key, tags[key]]);

  return (
    <TagContainer>
      {tagArr.map(tag => (
        <div key={tag[0]}>
          <span>{`${tag[0]} `}</span>
          <span>{tag[1]}</span>
        </div>
      ))}
    </TagContainer>
  );
};

export default TagArea;
