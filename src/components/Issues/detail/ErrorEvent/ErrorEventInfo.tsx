import React, { useState, useEffect } from 'react';
import ISsueDetailApi from '@utils/IssueDetailApi';
import styled from 'styled-components';
import StackItem from './StackItem';

const EventIdContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const EventIdText = styled.h3`
  color: red;
  margin-left: 1rem;
`;

const errorParser = (stack: string) => {
  const errorStack: string[] = stack.split('\n    ');
  const errorMessage: string = errorStack.shift();

  return { errorStack: errorStack, errorMessage: errorMessage };
};

const ErrorEventInfo = props => {
  const { errorEvent } = props;
  const { errorStack, errorMessage } = errorParser(errorEvent.stack);

  const lineNumber: number[] = errorEvent.errArea ? errorEvent.errArea.key : [];
  const errorCode: string[] = errorEvent.errArea
    ? errorEvent.errArea.value
    : [];

  const errorRoot: string = errorStack.shift();
  return (
    <div>
      <EventIdContainer>
        <h3>Event ID</h3> <EventIdText>{errorEvent._id}</EventIdText>
      </EventIdContainer>
      <div>
        <h2>{errorMessage}</h2>
        <StackItem
          stack={errorStack}
          code={errorCode}
          line={lineNumber}
          errorRoot={errorRoot}
          tags={errorEvent.tags}
        />
      </div>
    </div>
  );
};

export default ErrorEventInfo;
