import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import LeftBar from '@components/common/LeftBar';
import DailyErrorChart from '@components/stats/DailyErrorChart';
import IssuePieChart from '@components/stats/IssuePieChart';
import ResolveGaugeChart from '@components/stats/ResolveGaugeChart';
import TagBarChart from '@components/stats/TagBarChart';
import Api from '@utils/Api';
import { PositionDispatchContext } from '../context/PositionProvider';
import NoticeEmpty from '@components/common/NoticeEmpty';

interface tagDataType {
  key: string;
  value: { unknown }[];
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  StatsRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: '1rem 0 1.5rem',
  },
  tagChartContainer: {
    flex: '1',
    padding: '1rem 1.5rem',
    backgroundColor: 'rgba(200,200,200,0.2)',
    font: 'sans-serif',
  },
  barChartWrapper: {
    backgroundColor: 'rgba(200,200,200,0.2)',
    padding: '1rem 1.5rem',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(200,200,200,0.3)',
  },
}));

const StatsHeaderTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;
// width: calcvw - 340px);
const StatsBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
  margin: 0;
  margin-right: 1rem;
  padding: 0 1rem;
  background-color: rgba(0, 0, 0, 0);
`;

const PieChartsWrapper = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  height: fit-content;
`;

const PieChartWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-self: center;
  text-align: center;
  padding: 1rem;
  width: 100%;
`;

const TagBarChartWrapper = styled.div``;

const ChartTitle = styled.div`
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
`;

const TagTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
`;

const Stats = ({
  match: {
    params: { projectId },
  },
}) => {
  const classes = useStyles();
  const positionDispatch = React.useContext(PositionDispatchContext);

  const days = '14';
  const [errorData, setErrorData] = useState({ dates: [], errors: [] });
  const [allIssueData, setAllIssueData] = useState();
  const [unresolvedIssueData, setUnresolvedIssueData] = useState();
  const [resolvedRateData, setResolvedRateData] = useState();
  const [tagDatas, setTagDatas] = useState<{}[]>();

  const readDatas = async () => {
    const [dailyErrorData, issueData, tagData] = await Promise.all([
      await Api.getDailyError(projectId, days),
      await Api.getChartIssue(projectId),
      await Api.getChartTag(projectId),
    ]);
    setErrorData(dailyErrorData.data);
    setAllIssueData(issueData.data.allIssue);
    setUnresolvedIssueData(issueData.data.unresolvedIssue);
    setResolvedRateData(issueData.data.resolvedRate);
    const tempTagDatas = Object.keys(tagData.data).map(key => {
      const temp = {};
      temp['key'] = key;
      temp['value'] = tagData.data[key];
      return temp;
    });
    tempTagDatas.sort((a: tagDataType, b: tagDataType) =>
      a.key > b.key ? 1 : -1
    );
    setTagDatas(tempTagDatas);
  };

  useEffect(() => {
    readDatas();

    positionDispatch({
      type: 'update',
      content: 'Stats',
      projectId: projectId,
    });
  }, []);

  if (errorData) {
    console.log(errorData);
    if (errorData.errors.length < 1)
      return (
        <div className={classes.root}>
          <CssBaseline />
          <LeftBar />
          <main className={classes.content}>
            <Toolbar />
            <NoticeEmpty type={'stats'} />
          </main>
        </div>
      );
  }

  // if (errorData.errors.length < 1) {
  //   return <div>없다</div>;
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LeftBar />
      <main className={classes.content}>
        <Toolbar />
        <div className={classes.StatsRoot}>
          <StatsBodyWrapper>
            <div className={classes.barChartWrapper}>
              <ChartTitle>Daily Errors</ChartTitle>
              <DailyErrorChart errorData={errorData} />
            </div>
            <div className={classes.tagChartContainer}>
              <TagBarChartWrapper>
                <ChartTitle>Tags</ChartTitle>
                {tagDatas &&
                  tagDatas.map((data: tagDataType) => (
                    <div key={data.key}>
                      <TagTitle>{data.key}</TagTitle>
                      <TagBarChart tagName={data.key} tagData={data.value} />
                    </div>
                  ))}
              </TagBarChartWrapper>
            </div>
          </StatsBodyWrapper>
          <PieChartsWrapper>
            <PieChartWrapper>
              <ChartTitle>All Issues</ChartTitle>
              <IssuePieChart issueData={allIssueData} />
            </PieChartWrapper>
            <PieChartWrapper>
              <ChartTitle>Unresolved Issues</ChartTitle>
              <IssuePieChart issueData={unresolvedIssueData} />
            </PieChartWrapper>
            <PieChartWrapper>
              <ChartTitle>Resolved Issue Rate</ChartTitle>
              <ResolveGaugeChart rateData={resolvedRateData} name="resolved" />
            </PieChartWrapper>
          </PieChartsWrapper>
        </div>
      </main>
    </div>
  );
};

export default Stats;
