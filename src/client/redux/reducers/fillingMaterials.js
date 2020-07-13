import { createReducer } from 'reduxsauce';
import update from 'immutability-helper';
import { ModalTypes } from '../actions/fillingMaterials';

const INITIAL_STATE = {
  activeTrigger: 'customers',
  customers: {
    customersOption: null,
    isMilling: false,
  },
  dsp: {
    manufacturer: null,
    UVPrinting: false,
    searchField: '',
    dspOption: null,
    uvPrintType: null,
  },
  isOpenFillingModal: false,
};

const setActiveTrigger = (state = INITIAL_STATE, { trigger }) => update(state, {
  activeTrigger: { $set: trigger },
});

const setMillingToggle = (state = INITIAL_STATE, { isOn }) => update(state, {
  customers: { isMilling: { $set: isOn } },
});

const setCustomerOption = (state = INITIAL_STATE, { option }) => update(state, {
  customers: { customersOption: { $set: option } },
});

const setDspOption = (state = INITIAL_STATE, { option }) => update(state, {
  dsp: { dspOption: { $set: option } },
});

const setDspManufacturer = (state = INITIAL_STATE, { manufacture }) => update(state, {
  dsp: { manufacturer: { $set: manufacture } },
});

const setDspUvPrinting = (state = INITIAL_STATE, { isOn }) => update(state, {
  dsp: { UVPrinting: { $set: isOn } },
});

const setDspSearch = (state = INITIAL_STATE, { search }) => update(state, {
  dsp: { searchField: { $set: search } },
});

const setUvPrintType = (state = INITIAL_STATE, { printType }) => update(state, {
  dsp: { uvPrintType: { $set: printType } },
});

const toggleFillingMaterialModal = (state = INITIAL_STATE, { isOpen }) => update(state, {
  isOpenFillingModal: { $set: isOpen },
});


export default createReducer(INITIAL_STATE, {
  [ModalTypes.SET_ACTIVE_TRIGGER]: setActiveTrigger,
  [ModalTypes.TOGGLE_FILLING_MATERIAL_MODAL]: toggleFillingMaterialModal,
  [ModalTypes.SET_CUSTOMERS_OPTION]: setCustomerOption,
  [ModalTypes.SET_DSP_OPTION]: setDspOption,
  [ModalTypes.SET_DSP_MANUFACTURER]: setDspManufacturer,
  [ModalTypes.SET_DSP_UV_PRINTING]: setDspUvPrinting,
  [ModalTypes.SET_DSP_SEARCH]: setDspSearch,
  [ModalTypes.SET_UV_PRINT_TYPE]: setUvPrintType,
  [ModalTypes.SET_MILLING_TOGGLE]: setMillingToggle,
});
