import React from 'react';

import Home from '../containers/Home';
import Systems from '../containers/Systems';
import ExtendableSystem from '../containers/ExtendableSystem';

const routes = {
  '/': () => <Home />,
  '/systems': () => <Systems />,
  '/extendable': () => <ExtendableSystem />,
};

export default routes;
