// import { resettableReducer } from 'reduxsauce';
import { combineReducers } from 'redux';

import doorsAndSections from './doorsAndSections';
import navigation from './navigation';
import fillingMaterials from './fillingMaterials';

// Listen for the action type of 'RESET', you can change this.
// const resettable = resettableReducer('RESET');

const reducers = combineReducers({
  doorsAndSections,
  navigation,
  fillingMaterials,
});

export default reducers;
