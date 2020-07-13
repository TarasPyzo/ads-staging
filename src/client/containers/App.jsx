import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';

import routes from '../routes';
import NotFoundPage from './NotFoundPage';

const App = () => {
  const match = useRoutes(routes);

  useRedirect('/', '/extendable');

  return match || <NotFoundPage />;
};

export default App;
