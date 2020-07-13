import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  openNavigation: null,
  closeNavigation: null,
});

export const NavigationTypes = Types;
export default Creators;
