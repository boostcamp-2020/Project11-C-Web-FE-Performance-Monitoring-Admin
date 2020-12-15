import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import LeftBar from '@components/Issues/LeftBar';
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
    color: 'black',
  },
}));

const StatsHeaderTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const Stats = ({
  match: {
    params: { projectId },
  },
}) => {
  const classes = useStyles();

  const days = '25';
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
          <DailyErrorChart errorData={errorData} />
          <IssuePieChart issueData={allIssueData} />
          <IssuePieChart issueData={unresolvedIssueData} />
          <ResolveGaugeChart rateData={resolvedRateData} name="resolved" />
          {tagDatas &&
            tagDatas.map((data: tagDataType) => (
              <TagBarChart key={data.key} tagData={data.value} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Stats;
