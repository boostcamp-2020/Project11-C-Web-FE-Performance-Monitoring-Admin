import React from 'react';
import styled from 'styled-components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  flex: 1.5;

  padding: 2rem;
  margin-left: 2rem;
`;
const Head = styled.b`
  font-size: 3.5rem;
  color: #64ffda;
`;
const Desc = styled.p`
  font-size: 1.5rem;
  color: #f1f1f1;
  padding-top: 1rem;
`;

const ButtonArea = styled.div`
  margin-top: 1rem;
`;

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}));

const LeftContents = () => {
  const classes = useStyles();

  return (
    <Container>
      <Head>Acent</Head>
      <Desc>에러 수집과 시각화를 통한 프로젝트 관리 서비스</Desc>
      <ButtonArea>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<ArrowRightIcon />}
        >
          Get Started
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<ArrowRightIcon />}
        >
          Tutorial
        </Button>
      </ButtonArea>
    </Container>
  );
};

export default LeftContents;
