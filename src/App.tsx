import React from 'react';
import Main from './pages/Main';
import GlobalStyle from '../style/globalStyle';

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Main />
    </div>
  );
};

export default App;
