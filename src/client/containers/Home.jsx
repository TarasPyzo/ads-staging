import React from 'react';
import { useTitle } from 'hookrouter';

import Main from './layout/Main';

const Home = () => {
  useTitle('ADS');

  return (
    <Main
      className="home-page"
    >
      <h1>ADS Webapp</h1>
    </Main>
  );
};

export default Home;
