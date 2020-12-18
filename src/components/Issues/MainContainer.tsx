import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Filter from './issue/Filter';
import TableColumn from './issue/TableColumn';
import ResolveProvider from '../../context/ResolveProvider';
import NoticeEmpty from '../common/NoticeEmpty';
import { IssuesStateContext } from '../../context/IssuesProvider';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  MainCotainer: {
    overflow: 'hidden',
  },
}));

const MainContainer = ({ projectId }) => {
  const classes = useStyles();

  return (
    <div className={classes.MainCotainer}>
      <Filter projectId={projectId} />
      <ResolveProvider>
        <TableColumn />
      </ResolveProvider>
    </div>
  );
};

export default MainContainer;
