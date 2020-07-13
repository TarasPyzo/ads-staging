import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Menu from './Menu';

const Main = ({
  children,
  className,
}) => (
  <div className="main-wrapper">
    <Header />
    <Menu />

    <div className={className}>
      <main className="page--main" role="main">
        <div className="page--main-inner">
          {children}
        </div>
      </main>
    </div>
  </div>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
  ]),
  className: PropTypes.string,
};

Main.defaultProps = {
  children: null,
  className: null,
};

export default Main;
