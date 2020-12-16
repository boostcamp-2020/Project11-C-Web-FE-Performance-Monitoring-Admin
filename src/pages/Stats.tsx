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
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '0',
    paddingLeft: '0',
    marginTop: '-0.5rem',
    color: 'white',
  },
}));

const StatsHeaderTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const StatsBodyWrapper = styled.div`
  width: calc(100vw - 340px);
  margin: 0;
  color: rgba(0, 0, 0, 1);
  & > div {
    margin: 2rem 0;
  }
`;

const PieChartsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TagBarChartWrapper = styled.div``;

const ChartTitle = styled.div`
  margin: 1rem 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
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

  const days = '20';
  const [errorData, setErrorData] = useState();
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
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <LeftBar />
      <main className={classes.content}>
        <Toolbar />
        <div className={classes.StatsRoot}>
          <StatsHeaderTitle>Stats</StatsHeaderTitle>
          <StatsBodyWrapper>
            <ChartTitle>Daily Errors</ChartTitle>
            <DailyErrorChart errorData={errorData} />
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
                <ResolveGaugeChart
                  rateData={resolvedRateData}
                  name="resolved"
                />
              </PieChartWrapper>
            </PieChartsWrapper>
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
          </StatsBodyWrapper>
        </div>
      </main>
    </div>
  );
};

export default Stats;
