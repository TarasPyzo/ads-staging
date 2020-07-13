import { createReducer } from 'reduxsauce';

import { NavigationTypes } from '../actions/navigation';

const INITIAL_STATE = {
  isMenuOpen: false,
};

const openNavigation = () => ({ isMenuOpen: true });
const closeNavigation = () => ({ isMenuOpen: false });

export default createReducer(INITIAL_STATE, {
  [NavigationTypes.OPEN_NAVIGATION]: openNavigation,
  [NavigationTypes.CLOSE_NAVIGATION]: closeNavigation,
});
