import React from 'react';
import { useTitle } from 'hookrouter';

import Main from './layout/Main';

const PageNotFound = () => {
  useTitle('Not Found');

  return (
    <Main
      className="empty-page"
    >
      <h1>Page Not Found</h1>
    </Main>
  );
};

export default PageNotFound;
