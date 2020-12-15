import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import guideInfo from './describe/guideInfo';
import { makeStyles } from '@material-ui/core/styles';

const UsageRoot = styled.div`
  padding: 1rem;
  background-color: rgba(45, 45, 45, 0.3);
  min-height: 100%;
  color: white;
`;

const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const UsageHeaderTitle = styled.h1`
  margin: 0;
  font-weight: 600;
`;

const UsageHeaderImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
`;

const useStyles = makeStyles(theme => ({
  SyntaxHighlighter: {
    backgroundColor: 'rgba(45,45,45,0.1)',
  },

  install: {},
}));

const Usage = ({ platform }) => {
  const classes = useStyles();
  const { bashCode, jsCode, catchDesc } = guideInfo(platform, null);

  return (
    <UsageRoot>
      <UsageHeader>
        <UsageHeaderTitle>How to use {platform}</UsageHeaderTitle>
        <UsageHeaderImage src={`../../../public/png/${platform}.png`} />
      </UsageHeader>
      <h2 className={classes.install}>Install</h2>
      <p> 다음과 같이 설치할 수 있습니다.</p>
      <SyntaxHighlighter
        language="bash"
        style={tomorrow}
        className={classes.SyntaxHighlighter}
      >
        {bashCode}
      </SyntaxHighlighter>
      <h2 className={classes.install}>Configure</h2>
      <p> Acent는 프로젝트의 생명주기에서 가능한 빨리 구성되어야 합니다.</p>
      <SyntaxHighlighter language="javascript" style={tomorrow}>
        {jsCode}
      </SyntaxHighlighter>
      <p> 또한 당신의 try-catch 구문에서 수동으로 에러를 잡을 수도 있습니다.</p>
      <SyntaxHighlighter language="javascript" style={tomorrow}>
        {catchDesc}
      </SyntaxHighlighter>
    </UsageRoot>
  );
};

export default Usage;
