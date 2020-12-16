import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const UsageRoot = styled.div`
  top: 4.75rem;
  margin: 2rem 2rem 2rem 17rem;
`;

const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2rem 0;
`;

const UsageHeaderTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const UsageHeaderImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
`;

const UsageButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0 0 0;
`;

const UsageButton = styled.button<{ isBlock: boolean }>`
  display: ${props => (props.isBlock ? 'block' : 'none')};
  padding: 1rem 2rem;
  border: 0.2rem solid rgba(0, 0, 0, 0.35);
  font-size: 1.5rem;
  font-weight: 600;
  &:not([disabled]):hover {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
    transition: 5ms;
  }
`;

const Usage = ({ match, location }) => {
  const history = useHistory();

  const [isPlatform, setIsPlatform] = useState(false);
  const [platform, setPlatform] = useState(match.params.platform);
  const [dsn, setDsn] = useState(location.state?.dsn);

  const clickUsageButton = () => {
    history.push(`/projects/issues/${location.state?.projectId}`);
  };

  useEffect(() => {
    const checkPlatform = [
      'Node',
      'Express',
      'React',
      'Vue',
      'JavaScript',
    ].includes(platform);
    setIsPlatform(checkPlatform);
  }, []);

  const bashCode = `# npm version
npm install @acent/node
# yanr version 
yarn add @acent/node`;

  const jsCode = `import acent from @acent/node 

acent.startErrorCapturing();
acent.init({ dsn: '${dsn || '[host:port]/errorevent/[projectId]'}' });

//에러 핸들러는 라우터 미들웨어 뒤에, 다른 에러핸들링 미들웨어 이전에 위치
app.use((acent.errorHandler());
// TS version 
app.use((acent.errorHandler() as unknown) as express.ErrorRequestHandler);`;

  return (
    isPlatform && (
      <UsageRoot>
        <UsageHeader>
          <UsageHeaderTitle>How to use : {platform}</UsageHeaderTitle>
          <UsageHeaderImage src={`../../../public/png/${platform}.png`} />
        </UsageHeader>
        <SyntaxHighlighter language="bash" style={tomorrow}>
          {bashCode}
        </SyntaxHighlighter>
        <SyntaxHighlighter language="javascript" style={tomorrow}>
          {jsCode}
        </SyntaxHighlighter>
        <UsageButtonWrapper>
          <UsageButton onClick={clickUsageButton} isBlock={!!dsn}>
            Issue Page
          </UsageButton>
        </UsageButtonWrapper>
      </UsageRoot>
    )
  );
};

export default Usage;
