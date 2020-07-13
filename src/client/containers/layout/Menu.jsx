import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { A } from 'hookrouter';

import NavigationActions from '../../redux/actions/navigation';

const Menu = () => {
  const dispatch = useDispatch();
  const state = useSelector(({ navigation }) => ({ navigation }));
  const { isMenuOpen } = state.navigation;

  if (!isMenuOpen) return null;

  return (
    <nav role="navigation" className="menu">
      <div className="menu--inner">
        <A
          href="/extendable"
          className="menu--item"
          onClick={() => { dispatch(NavigationActions.closeNavigation()); }}
        >
          <span>Extendable Configurator</span>
        </A>
      </div>
    </nav>
  );
};

export default Menu;
