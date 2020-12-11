import React, { useState, useEffect } from 'react';
import ISsueDetailApi from '@utils/IssueDetailApi';
import styled from 'styled-components';

const EventIdContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const EventIdText = styled.h3`
  color: red;
  margin-left: 1rem;
`;

const ErrorEventInfo = props => {
  const { errorEvent } = props;

  // const sourcePosArr = errorEvent.errArea.key;
  // const soucreArr = errorEvent.errArea.value;

  // const sourceCode = soucreArr.map(function (line, idx, array) {
  //   return <div> {`${sourcePosArr[idx]}: ${line}`}</div>;
  // });

  return (
    <div>
      <EventIdContainer>
        <h3>Event</h3> <EventIdText>{errorEvent._id}</EventIdText>
      </EventIdContainer>

      <div>
        <h2>Stack trace</h2>
        {errorEvent.stack}
      </div>
      <h2>Tags</h2>
    </div>
  );
};

export default ErrorEventInfo;
