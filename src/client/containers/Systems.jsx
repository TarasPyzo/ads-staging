import React from 'react';
import { useTitle } from 'hookrouter';

import Main from './layout/Main';

const Systems = () => {
  useTitle('Systems');

  return (
    <Main
      className="systems-page"
    >
      <h1>Systems</h1>
    </Main>
  );
};

export default Systems;
