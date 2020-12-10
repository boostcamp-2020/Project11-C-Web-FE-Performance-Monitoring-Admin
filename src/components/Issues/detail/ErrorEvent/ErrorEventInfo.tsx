import React, { useState, useEffect } from 'react';
import ISsueDetailApi from '@utils/IssueDetailApi';
import styled from 'styled-components';

const ErrorEventInfo = props => {
  const { errorEvent } = props;

  const sourcePosArr = errorEvent.errArea.key;
  const soucreArr = errorEvent.errArea.value;

  const sourceCode = soucreArr.map(function (line, idx, array) {
    return <div> {`${sourcePosArr[idx]}: ${line}`}</div>;
  });

  return (
    <div>
      <div>
        <h3>EVENTID : {errorEvent._id}</h3>
      </div>
      <div>
        <h2>{errorEvent.name}</h2>
        <h3>{errorEvent.message}</h3>
      </div>

      <div>
        <h2>STACK TRACE</h2>
        {errorEvent.stack}
      </div>
      <div>
        <h2>에러 발생 소스코드</h2>
        {sourceCode}
      </div>

      <div></div>
    </div>
  );
};

export default ErrorEventInfo;
