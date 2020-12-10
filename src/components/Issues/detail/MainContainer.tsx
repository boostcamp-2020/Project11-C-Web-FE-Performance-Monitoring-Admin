import React, { useState, useEffect } from 'react';
import ISsueDetailApi from '@utils/IssueDetailApi';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Backdrop } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import SkipNext from '@material-ui/icons/SkipNext';
import ErrorEventInfo from './ErrorEvent/ErrorEventInfo';
import TagArea from './TagArea';

const IssueContainer = styled.div`
  border-color: rgba(255, 255, 255, 0.1);
  border-width: 0.1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-top-style: solid;
  color: white;
`;

const IssueHeader = styled.div``;

const MenuContainer = styled.div``;

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 5,
    color: '#fff',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const MainContainer = (props: { issueId: string }) => {
  const classes = useStyles();
  const { issueId } = props;
  const [issue, setIssue] = useState(null); // 이슈 상세정보
  const [isLoading, setIsLoading] = useState(true); // 로딩상태 state
  const [errorEvent, seterrorEvent] = useState(null); // 현재 에러이벤트 정보
  const [currentErrorEventIdx, setCurrentErrorEventIdx] = useState(-1); // 현재 에러이벤트 인덱스 issue.ErrorEvents[idx]

  // 이전 이벤트 불러오기
  const prevErrorEventHandler = async () => {
    const { errorEvents } = issue;
    setIsLoading(true);
    const preidx = currentErrorEventIdx - 1;
    setCurrentErrorEventIdx(preidx);
    const errorEventData = await ISsueDetailApi.getErrorEventByErrorEventId(
      errorEvents[preidx]
    );
    seterrorEvent(errorEventData);
    setIsLoading(false);
  };
  // 다음 이벤트 불러오기
  const nextErrorEventHandler = async () => {
    const { errorEvents } = issue;
    setIsLoading(true);
    const preidx = currentErrorEventIdx + 1;
    setCurrentErrorEventIdx(preidx);
    const errorEventData = await ISsueDetailApi.getErrorEventByErrorEventId(
      errorEvents[preidx]
    );
    seterrorEvent(errorEventData);
    setIsLoading(false);
  };

  useEffect(() => {}, [currentErrorEventIdx]);

  const initISsueData = async () => {
    setIsLoading(true);
    const issueData = await ISsueDetailApi.getDetailIssueByIssueId(issueId);
    setIssue(issueData);
    const errorEventId =
      issueData.errorEvents[issueData.errorEvents.length - 1];
    const errorEventData = await ISsueDetailApi.getErrorEventByErrorEventId(
      errorEventId
    );
    setCurrentErrorEventIdx(issueData.errorEvents.length - 1);
    seterrorEvent(errorEventData);
    setIsLoading(false);
  };

  useEffect(() => {
    initISsueData(); // 이슈 정보, 가장 최근 발생한 에러 이벤트 받아옴
  }, []);

  if (isLoading) {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  const pathInfo = issue?.stack.split('\n')[1].split('/');
  const fileInfo = pathInfo[pathInfo.length - 1];

  return (
    <IssueContainer>
      <IssueHeader>
        <h1>ISSUE: {`${issue.name}(${fileInfo})`}</h1>
        <h2> {issue.message}</h2>
        <h2>EVENT 개수 : {issue.errorEvents.length}</h2>
        <h3>
          마지막 이슈 발생시각: {new Date(issue.updatedAt).toLocaleString()}
        </h3>
      </IssueHeader>
      <MenuContainer>
        <Button
          disabled={currentErrorEventIdx - 1 < 0}
          /* 인덱스 벗어나면 버튼 비활성화 */
          onClick={prevErrorEventHandler}
          variant="outlined"
          color="default"
          className={classes.button}
          startIcon={<SkipPrevious />}
        >
          이전 이벤트
        </Button>
        <Button
          onClick={nextErrorEventHandler}
          disabled={
            currentErrorEventIdx + 1 >= issue.errorEvents.length
          } /* 인덱스 벗어나면 버튼 비활성화 */
          variant="outlined"
          color="default"
          className={classes.button}
          startIcon={<SkipNext />}
        >
          다음 이벤트
        </Button>
      </MenuContainer>
      <TagArea tags={errorEvent.tags} /* 태그 출력하는 영역  컴포넌트 */ />
      <ErrorEventInfo
        errorEvent={
          errorEvent
        } /* 현재 보고있는 에러 이벤트를 출력하는 컴포넌트 */
      />
    </IssueContainer>
  );
};

export default MainContainer;
