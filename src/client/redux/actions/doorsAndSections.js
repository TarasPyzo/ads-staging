import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setMinMaxDoorsAmountRequest: ['field'],
  setMinMaxDoorsAmountSuccess: null,
  setMinMaxDoorsAmountFailure: ['errorMessage'],

  increaseDoorsAmountRequest: ['amountToAdd'],
  increaseDoorsAmountSuccess: null,
  increaseDoorsAmountFailure: ['errorMessage'],

  decreaseDoorsAmountRequest: ['amountToRemove'],
  decreaseDoorsAmountSuccess: null,
  decreaseDoorsAmountFailure: ['errorMessage'],

  updateMainDoorRequest: ['field'],
  updateMainDoorSuccess: null,
  updateMainDoorFailure: ['errorMessage'],

  addDoorRequest: null,
  addDoorSuccess: null,
  addDoorFailure: ['errorMessage'],

  copyDoorRequest: ['doorIndexFrom', 'doorIndexesTo'],
  copyDoorSuccess: null,
  copyDoorFailure: ['errorMessage'],

  removeDoorRequest: ['doorIndex'],
  removeDoorSuccess: null,
  removeDoorFailure: ['errorMessage'],

  updateMainDoorFillingRequest: ['filling'],
  updateMainDoorFillingSuccess: null,
  updateMainDoorFillingFailure: ['errorMessage'],

  updateMainSectionRequest: ['doorIndex', 'field'],
  updateMainSectionSuccess: null,
  updateMainSectionFailure: ['errorMessage'],

  updateSectionRequest: ['doorIndex', 'sectionIndex', 'field'],
  updateSectionSuccess: null,
  updateSectionFailure: ['errorMessage'],

  addSectionRequest: ['doorIndex'],
  addSectionSuccess: null,
  addSectionFailure: ['errorMessage'],

  copySectionRequest: ['doorIndex', 'sectionIndex'],
  copySectionSuccess: null,
  copySectionFailure: ['errorMessage'],

  mergeSectionRequest: ['doorIndex', 'sectionIndexToRemove', 'mergeOption'],
  mergeSectionSuccess: null,
  mergeSectionFailure: ['errorMessage'],

  removeLastSectionRequest: ['doorIndex'],
  removeLastSectionSuccess: null,
  removeLastSectionFailure: ['errorMessage'],

  alignSectionsRequest: ['doorIndex'],
  alignSectionsSuccess: null,
  alignSectionsFailure: ['errorMessage'],

  updateMainSectionFillingRequest: ['doorIndex', 'filling'],
  updateMainSectionFillingSuccess: null,
  updateMainSectionFillingFailure: ['errorMessage'],

  updateSectionFillingRequest: ['doorIndex', 'sectionIndex', 'filling'],
  updateSectionFillingSuccess: null,
  updateSectionFillingFailure: ['errorMessage'],

  resetFieldsDependentOnSideProfile: null,

  toggleCopyDoorModal: ['isOpen'],
  toggleMergeSectionModal: ['isOpen'],
});

export const DoorTypes = Types;
export default Creators;
