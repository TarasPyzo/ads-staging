import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setActiveTrigger: ['trigger'],
  setCustomersOption: ['option'],
  setMillingToggle: ['isOn'],
  setDspOption: ['option'],
  setDspManufacturer: ['manufacture'],
  setDspSearch: ['search'],
  setDspUvPrinting: ['isOn'],
  setUvPrintType: ['printType'],
  toggleFillingMaterialModal: ['isOpen'],
});

export const ModalTypes = Types;
export default Creators;
