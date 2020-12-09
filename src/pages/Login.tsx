// eslint-disable-next-line no-use-before-define
import React from 'react';
import styled from 'styled-components';
import Header from '@components/utils/Header';
import LeftContents from '@components/login/LeftContents';
import RightContents from '@components/login/RightContents';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 240;

const BackImg = styled.img`
  width: 100%;
  margin-top: 5%;
  position: absolute;
`;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: 59,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <RootContainer>
      <AppBar position="fixed" className={classes.appBar}>
        <Header />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
      </Drawer>
      <BodyContainer>
        <LeftContents />
        <RightContents />
      </BodyContainer>
      <BackImg src="../../public/svg/fractal_25.svg" />
    </RootContainer>
  );
};

const BodyContainer = styled.div`
  width: 80%;
  height: 80%;

  display: flex;
  flex-direction: row;

  margin: 0 auto;
  margin-top: 8rem;
  padding-left: 1.5rem;
  z-index: 2;
`;

const RootContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  margin: 0 auto;
`;

export default Login;
