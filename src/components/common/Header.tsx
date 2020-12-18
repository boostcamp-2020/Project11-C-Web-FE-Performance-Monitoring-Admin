import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import SignInModal from '@components/common/SignInModal';
import Api from '@utils/Api';

const HeaderButton = styled.button`
  margin: 0 auto;
  padding: 1rem;
  padding-left: 2rem;

  font-size: 1.5rem;
  color: white;

  text-align: center;
  background-color: rgba(255, 255, 255, 0);

  &:hover {
    color: lightgray;
  }
`;

const HomeButton = styled.button`
  margin: 0 auto;
  padding: 1rem;
  padding-left: 2rem;

  font-size: 1.5rem;
  color: #64ffda;

  text-align: center;
  background-color: rgba(255, 255, 255, 0);

  &:hover {
    color: #00bfa5;
  }
`;

const HeaderContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalBody = React.forwardRef((props: any, ref: any) => (
  <div ref={ref}>
    <SignInModal setModalOpen={props.setModalOpen} />
  </div>
));

const GlobalHeader = () => {
  const history = useHistory();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [isSignIn, setSignIn] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const HomeHandler = () => {
    history.push('/');
  };

  const docsClicked = () => {
    history.push('/docs');
  };

  const tutorialClicked = () => {
    history.push('/tutorial');
  };

  const clickSignOut = async () => {
    await Api.getSignOut();
    setSignIn(false);
    history.push('/');
  };

  useEffect(() => {
    setSignIn(!!document.cookie);
  }, [document.cookie, location]);

  return (
    <>
      <HeaderContainer>
        <Grid container spacing={1}>
          <Grid item xs>
            <HomeButton onClick={HomeHandler}>@Acent</HomeButton>
          </Grid>
          <Grid item xs={6}>
            <HeaderButton onClick={docsClicked}>Docs</HeaderButton>
            <HeaderButton onClick={tutorialClicked}>Tutorial</HeaderButton>
          </Grid>
          <Grid item xs>
            {isSignIn ? (
              <HeaderButton onClick={clickSignOut}>Sign Out</HeaderButton>
            ) : (
              <HeaderButton onClick={handleModalOpen}>Sign In</HeaderButton>
            )}
          </Grid>
        </Grid>
      </HeaderContainer>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <ModalBody setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default GlobalHeader;
