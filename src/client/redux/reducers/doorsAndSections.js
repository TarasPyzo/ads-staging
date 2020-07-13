import { createReducer } from 'reduxsauce';
import update from 'immutability-helper';

import { emptyDoor, emptySection } from '../../helpers/initialStateHelper';
import { DoorTypes } from '../actions/doorsAndSections';
import {
  defaultDoorsAmount,
  minDoorOpeningHeight,
  minDoorOpeningWidth,
} from '../../helpers/constants';

const INITIAL_STATE = {
  isLoading: false,
  errorMessage: null,
  // TODO: default values should be set after choosing system type
  minDoorsAmount: 2,
  maxDoorsAmount: 8,
  minSectionsAmount: 0,
  maxSectionsAmount: 7,

  isOpenCopyDoorModal: false,
  isOpenCopySectionModal: false,
  isOpenMergeSectionModal: false,

  mainDoor: {
    filling: {}, // Материал наполнения
    doorOpeningHeight: { value: minDoorOpeningHeight }, // "Высота дверного проёма"
    doorOpeningWidth: { value: minDoorOpeningWidth }, // "Ширина дверного проёма"
    doorsAmount: { value: defaultDoorsAmount },
    doorPositioning: { value: 'chessboard' }, // "Схема размещения дверей"
    sideProfile: {}, // "Боковой профиль"
    aluminiumColor: {}, // "Цвет алюминиевого профиля"
    mechanism: {}, // "Механизм"
    stopper: {}, // "Стопор"
    texture: { value: 'vertical' },
  },

  doors: [
    { ...emptyDoor, ...{ sequenceNumber: 1 } },
    { ...emptyDoor, ...{ sequenceNumber: 2 } },
  ],
};

/**
 * Reducers handlers
 */

/**
 * Doors
 */

/** Set min max Doors Amount */

const setMinMaxDoorsAmountRequest = (state = INITIAL_STATE, { field }) => update(state, {
  isLoading: { $set: true },
  [field.name]: { $set: field.value },
});

const setMinMaxDoorsAmountSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const setMinMaxDoorsAmountFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Handle doors amount to set it within the range limits specified by the min and max */
/** Increase doors amount (push new doors) */
const increaseDoorsAmountRequest = (state = INITIAL_STATE, { amountToAdd }) => {
  const doorsToAdd = Array
    .from(Array(amountToAdd))
    .map((door, index) => ({
      ...emptyDoor,
      ...{ sequenceNumber: state.doors.length + index + 1 },
    }));

  return update(state, {
    isLoading: { $set: true },
    errorMessage: { $set: null },
    mainDoor: {
      doorsAmount: {
        value: {
          $set: state.mainDoor.doorsAmount.value + amountToAdd,
        },
      },
    },
    doors: { $push: doorsToAdd },
  });
};

const increaseDoorsAmountSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const increaseDoorsAmountFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Handle doors amount to set it within the range limits specified by the min and max */
/** Decrease doors amount (slice last doors) */
const decreaseDoorsAmountRequest = (state = INITIAL_STATE, { amountToRemove }) => update(state, {
  isLoading: { $set: true },
  errorMessage: { $set: null },
  mainDoor: {
    doorsAmount: {
      value: {
        $set: state.mainDoor.doorsAmount.value - amountToRemove,
      },
    },
  },
  doors: { $set: state.doors.slice(0, state.doors.length - amountToRemove) },
});

const decreaseDoorsAmountSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const decreaseDoorsAmountFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Update Door's Main Tab */

const updateMainDoorRequest = (state = INITIAL_STATE, { field }) => update(state, {
  isLoading: { $set: true },
  mainDoor: {
    [field.name]: {
      value: {
        $set: field.value,
      },
      error: {
        $set: field.error,
      },
    },
  },
});

const updateMainDoorSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const updateMainDoorFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Push a new Door */

const addDoorRequest = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: true },
  errorMessage: { $set: null },
  doors: {
    $push: [{ ...emptyDoor, ...{ sequenceNumber: state.doors.length + 1 } }],
  },
});

const addDoorSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const addDoorFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Copy mainSection and sections of the Door to selected doors */

const copyDoorRequest = (state = INITIAL_STATE, { doorIndexFrom, doorIndexesTo }) => {
  const mainSectionToApply = state.doors[doorIndexFrom]?.mainSection;
  const sectionsToApply = state.doors[doorIndexFrom]?.sections;

  // Note: It will replace mainSection and sections if they created

  return update(state, {
    isLoading: { $set: true },
    doors: {
      $apply: (doors) => doors.map((door, index) => {
        if (doorIndexesTo.indexOf(`${index}`) !== -1) {
          return update(door, {
            mainSection: {
              $set: mainSectionToApply,
            },
            sections: {
              $apply: (sections) => {
                if (!sections.length) {
                  // Apply with all sections
                  return update(sections, {
                    $set: sectionsToApply,
                  });
                }

                return sections.map((section, i) => {
                  if (!sectionsToApply[i]) {
                    return update(section, { $set: section });
                  }
                  return update(section, {
                    $set: sectionsToApply[i],
                  });
                });
              },
            },
          });
        }

        return update(door, { $set: door });
      }),
    },
  });
};

const copyDoorSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const copyDoorFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Remove the Door */

// TODO: update sequenceNumber for all doors
const removeDoorRequest = (state = INITIAL_STATE, { doorIndex }) => update(state, {
  isLoading: { $set: true },
  doors: { $splice: [[doorIndex, 1]] },
});

const removeDoorSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const removeDoorFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Update Main Door Filling Materials */

const updateMainDoorFillingRequest = (state = INITIAL_STATE, { filling }) => update(state, {
  isLoading: { $set: true },
  mainDoor: {
    filling: { $set: filling },
  },
});

const updateMainDoorFillingSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const updateMainDoorFillingFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/**
 * Sections
 */

/** Update Main Tab of the Door Section */

const updateMainSectionRequest = (state = INITIAL_STATE, {
  doorIndex,
  field,
}) => update(state, {
  isLoading: { $set: true },
  doors: {
    [doorIndex]: {
      mainSection: {
        [field.name]: {
          value: {
            $set: field.value,
          },
          error: {
            $set: field.error,
          },
        },
      },
    },
  },
});

const updateMainSectionSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const updateMainSectionFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Update Section of the Door */

const updateSectionRequest = (state = INITIAL_STATE, {
  doorIndex,
  sectionIndex,
  field,
}) => update(state, {
  isLoading: { $set: true },
  doors: {
    [doorIndex]: {
      sections: {
        [sectionIndex]: {
          [field.name]: {
            value: {
              $set: field.value,
            },
            error: {
              $set: field.error,
            },
          },
        },
      },
    },
  },
});

const updateSectionSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const updateSectionFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Push new Section(s) */

const addSectionRequest = (state = INITIAL_STATE, { doorIndex }) => {
  const currentSectionsAmount = state.doors[doorIndex]?.mainSection?.sectionsAmount?.value;
  const directionOfSections = state.doors[doorIndex]?.mainSection?.directionOfSections?.value;
  const doorHeight = state.mainDoor?.doorOpeningHeight?.value;
  const doorWidth = state.mainDoor?.doorOpeningWidth?.value;

  let sectionHeight = 1;
  let sectionWidth = 1;

  if (directionOfSections === 'horizontal') {
    sectionWidth = doorWidth;
    sectionHeight = currentSectionsAmount === 0
      ? Math.round(doorHeight / 2)
      : Math.round(doorHeight / (currentSectionsAmount + 1));
  }

  if (directionOfSections === 'vertical') {
    sectionHeight = doorHeight;
    sectionWidth = currentSectionsAmount === 0
      ? Math.round(doorWidth / 2)
      : Math.round(doorWidth / (currentSectionsAmount + 1));
  }

  const sectionToAdd = {
    ...emptySection,
    ...{
      visibleHeight: { value: { $set: sectionHeight } },
      visibleWidth: { value: { $set: sectionWidth } },
    },
  };

  // Note: It will add sections from 0 to 2 in one go

  const sectionsToAdd = currentSectionsAmount === 0
    ? [{
      ...sectionToAdd,
      ...{ sequenceNumber: state.doors[doorIndex].sections.length + 1 },
    }, {
      ...sectionToAdd,
      ...{ sequenceNumber: state.doors[doorIndex].sections.length + 2 },
    }]
    : [{
      ...sectionToAdd,
      ...{ sequenceNumber: state.doors[doorIndex].sections.length + 1 },
    }];

  return update(state, {
    isLoading: { $set: true },
    doors: {
      [doorIndex]: {
        mainSection: {
          sectionsAmount: {
            value: {
              $set: currentSectionsAmount === 0
                ? currentSectionsAmount + 2
                : currentSectionsAmount + 1,
            },
          },
        },
        sections: {
          $push: sectionsToAdd,
          $apply: (sections) => sections.map((section) => update(section, {
            visibleHeight: { value: { $set: sectionHeight } },
            visibleWidth: { value: { $set: sectionWidth } },
          })),
        },
      },
    },
  });
};

const addSectionSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const addSectionFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Apply Section filling to other sections inside current Door  */

const copySectionRequest = (state = INITIAL_STATE, { doorIndex, sectionIndex }) => update(state, {
  isLoading: { $set: true },
  doors: {
    [doorIndex]: {
      sections: {
        $apply: (sections) => sections.map((section) => update(section, {
          filling: {
            $set: state.doors[doorIndex].sections[sectionIndex].filling,
          },
          texture: {
            $set: state.doors[doorIndex].sections[sectionIndex].texture,
          },
        })),
      },
    },
  },
});

const copySectionSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const copySectionFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Merge Section with another (first or last) one OR just remove with aligning */

const mergeSectionRequest = (state = INITIAL_STATE, {
  doorIndex,
  sectionIndexToRemove,
  mergeOption,
}) => {
  const sectionToRemove = state.doors[doorIndex].sections[sectionIndexToRemove];
  const sectionsAmount = state.doors[doorIndex]?.mainSection?.sectionsAmount?.value;

  const currentSectionsAmount = state.doors[doorIndex]?.mainSection?.sectionsAmount?.value;
  const directionOfSections = state.doors[doorIndex]?.mainSection?.directionOfSections?.value;
  const doorHeight = state.mainDoor?.doorOpeningHeight?.value;
  const doorWidth = state.mainDoor?.doorOpeningWidth?.value;

  let sectionHeight = 1;
  let sectionWidth = 1;

  if (directionOfSections === 'horizontal') {
    sectionWidth = doorWidth;
    sectionHeight = currentSectionsAmount === 2
      ? doorHeight
      : Math.round(doorHeight / (currentSectionsAmount - 1));
  }

  if (directionOfSections === 'vertical') {
    sectionHeight = doorHeight;
    sectionWidth = currentSectionsAmount === 2
      ? doorWidth
      : Math.round(doorWidth / (currentSectionsAmount - 1));
  }

  // Just remove the section and align other sections
  if (mergeOption === 'align-all') {
    return update(state, {
      isLoading: { $set: true },
      doors: {
        [doorIndex]: {
          mainSection: {
            sectionsAmount: {
              value: { $set: sectionsAmount - 1 },
            },
          },
          sections: {
            $apply: (sections) => sections.map((section) => update(section, {
              visibleHeight: { value: { $set: sectionHeight } },
              visibleWidth: { value: { $set: sectionWidth } },
            })),
            $splice: [[sectionIndexToRemove, 1]],
          },
        },
      },
    });
  }

  // Merge Section with sections[sectionIndexToMergeWith]

  const sectionIndexToMergeWith = mergeOption === 'last'
    ? state.doors[doorIndex].sections.length - 1
    : 0;

  if (directionOfSections === 'horizontal') {
    sectionWidth = doorWidth;
    sectionHeight = sectionToRemove.visibleHeight?.value
      + state.doors[doorIndex].sections[sectionIndexToMergeWith].visibleHeight?.value;
  }

  if (directionOfSections === 'vertical') {
    sectionHeight = doorHeight;
    sectionWidth = sectionToRemove.visibleWidth?.value
      + state.doors[doorIndex].sections[sectionIndexToMergeWith].visibleWidth?.value;
  }

  return update(state, {
    isLoading: { $set: true },
    doors: {
      [doorIndex]: {
        mainSection: {
          sectionsAmount: {
            value: { $set: sectionsAmount - 1 },
          },
        },
        sections: {
          $splice: [[sectionIndexToRemove, 1]],
          [sectionIndexToMergeWith]: {
            filling: {
              $set: sectionToRemove.filling,
            },
            texture: {
              $set: sectionToRemove.texture,
            },
            visibleHeight: { value: { $set: sectionHeight } },
            visibleWidth: { value: { $set: sectionWidth } },
          },
        },
      },
    },
  });
};

const mergeSectionSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const mergeSectionFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Remove last Section(s) and align all remaining sections */

const removeLastSectionRequest = (state = INITIAL_STATE, { doorIndex }) => {
  const currentSectionsAmount = state.doors[doorIndex]?.mainSection?.sectionsAmount?.value;
  const directionOfSections = state.doors[doorIndex]?.mainSection?.directionOfSections?.value;
  const doorHeight = state.mainDoor?.doorOpeningHeight?.value;
  const doorWidth = state.mainDoor?.doorOpeningWidth?.value;

  let sectionHeight = 1;
  let sectionWidth = 1;

  if (directionOfSections === 'horizontal') {
    sectionWidth = doorWidth;
    sectionHeight = currentSectionsAmount === 2
      ? doorHeight
      : Math.round(doorHeight / (currentSectionsAmount - 1));
  }

  if (directionOfSections === 'vertical') {
    sectionHeight = doorHeight;
    sectionWidth = currentSectionsAmount === 2
      ? doorWidth
      : Math.round(doorWidth / (currentSectionsAmount - 1));
  }

  // Note: It will reduce sections from 2 to 0 in one go

  return update(state, {
    isLoading: { $set: true },
    doors: {
      [doorIndex]: {
        mainSection: {
          sectionsAmount: {
            value: {
              $set: currentSectionsAmount === 2
                ? 0
                : currentSectionsAmount - 1,
            },
          },
        },
        sections: currentSectionsAmount === 2
          ? { $set: [] }
          : {
            $splice: [[currentSectionsAmount - 1, 1]],
            $apply: (sections) => sections.map((section) => update(section, {
              visibleHeight: { value: { $set: sectionHeight } },
              visibleWidth: { value: { $set: sectionWidth } },
            })),
          },
      },
    },
  });
};

const removeLastSectionSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const removeLastSectionFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Align all sections of the door */

const alignSectionsRequest = (state = INITIAL_STATE, { doorIndex }) => {
  const currentSectionsAmount = state.doors[doorIndex]?.mainSection?.sectionsAmount?.value;
  const directionOfSections = state.doors[doorIndex]?.mainSection?.directionOfSections?.value;
  const doorHeight = state.mainDoor?.doorOpeningHeight?.value;
  const doorWidth = state.mainDoor?.doorOpeningWidth?.value;

  let sectionHeight = 1;
  let sectionWidth = 1;

  if (directionOfSections === 'horizontal') {
    sectionWidth = doorWidth;
    sectionHeight = Math.round(doorHeight / currentSectionsAmount);
  }

  if (directionOfSections === 'vertical') {
    sectionHeight = doorHeight;
    sectionWidth = Math.round(doorWidth / currentSectionsAmount);
  }
  return update(state, {
    isLoading: { $set: true },
    doors: {
      [doorIndex]: {
        sections: {
          $apply: (sections) => sections.map((section) => update(section, {
            visibleHeight: { value: { $set: sectionHeight } },
            visibleWidth: { value: { $set: sectionWidth } },
          })),
        },
      },
    },
  });
};

const alignSectionsSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const alignSectionsFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Update Main Section Filling Materials */

const updateMainSectionFillingRequest = (state = INITIAL_STATE, {
  doorIndex,
  filling,
}) => update(state, {
  isLoading: { $set: true },
  doors: {
    [doorIndex]: {
      mainSection: {
        filling: { $set: filling },
      },
    },
  },
});

const updateMainSectionFillingSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const updateMainSectionFillingFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Update Section Filling Materials */

const updateSectionFillingRequest = (state = INITIAL_STATE, {
  doorIndex,
  sectionIndex,
  filling,
}) => update(state, {
  isLoading: { $set: true },
  doors: {
    [doorIndex]: {
      sections: {
        [sectionIndex]: {
          filling: { $set: filling },
        },
      },
    },
  },
});

const updateSectionFillingSuccess = (state = INITIAL_STATE) => update(state, {
  isLoading: { $set: false },
});

const updateSectionFillingFailure = (state = INITIAL_STATE, { errorMessage }) => update(state, {
  isLoading: { $set: false },
  errorMessage: { $set: errorMessage },
});

/** Reset fields dependent on selected side profile */

const resetFieldsDependentOnSideProfile = (state = INITIAL_STATE) => update(state, {
  mainDoor: {
    aluminiumColor: { $set: {} },
    mechanism: { $set: {} },
  },
  doors: {
    $apply: (doors) => doors.map((door) => update(door, {
      mainSection: {
        connectingProfile: { $set: {} },
      },
    })),
  },
});

/**
 * Modals
 */

const toggleCopyDoorModal = (state = INITIAL_STATE, { isOpen }) => update(state, {
  isOpenCopyDoorModal: { $set: isOpen },
});

const toggleMergeSectionModal = (state = INITIAL_STATE, { isOpen }) => update(state, {
  isOpenMergeSectionModal: { $set: isOpen },
});


/**
 * Reducers
 */

export default createReducer(INITIAL_STATE, {

  /** Doors */

  [DoorTypes.SET_MIN_MAX_DOORS_AMOUNT_REQUEST]: setMinMaxDoorsAmountRequest,
  [DoorTypes.SET_MIN_MAX_DOORS_AMOUNT_SUCCESS]: setMinMaxDoorsAmountSuccess,
  [DoorTypes.SET_MIN_MAX_DOORS_AMOUNT_FAILURE]: setMinMaxDoorsAmountFailure,

  [DoorTypes.INCREASE_DOORS_AMOUNT_REQUEST]: increaseDoorsAmountRequest,
  [DoorTypes.INCREASE_DOORS_AMOUNT_SUCCESS]: increaseDoorsAmountSuccess,
  [DoorTypes.INCREASE_DOORS_AMOUNT_FAILURE]: increaseDoorsAmountFailure,

  [DoorTypes.DECREASE_DOORS_AMOUNT_REQUEST]: decreaseDoorsAmountRequest,
  [DoorTypes.DECREASE_DOORS_AMOUNT_SUCCESS]: decreaseDoorsAmountSuccess,
  [DoorTypes.DECREASE_DOORS_AMOUNT_FAILURE]: decreaseDoorsAmountFailure,

  [DoorTypes.UPDATE_MAIN_DOOR_REQUEST]: updateMainDoorRequest,
  [DoorTypes.UPDATE_MAIN_DOOR_SUCCESS]: updateMainDoorSuccess,
  [DoorTypes.UPDATE_MAIN_DOOR_FAILURE]: updateMainDoorFailure,

  [DoorTypes.ADD_DOOR_REQUEST]: addDoorRequest,
  [DoorTypes.ADD_DOOR_SUCCESS]: addDoorSuccess,
  [DoorTypes.ADD_DOOR_FAILURE]: addDoorFailure,

  [DoorTypes.COPY_DOOR_REQUEST]: copyDoorRequest,
  [DoorTypes.COPY_DOOR_SUCCESS]: copyDoorSuccess,
  [DoorTypes.COPY_DOOR_FAILURE]: copyDoorFailure,

  [DoorTypes.REMOVE_DOOR_REQUEST]: removeDoorRequest,
  [DoorTypes.REMOVE_DOOR_SUCCESS]: removeDoorSuccess,
  [DoorTypes.REMOVE_DOOR_FAILURE]: removeDoorFailure,

  [DoorTypes.UPDATE_MAIN_DOOR_FILLING_REQUEST]: updateMainDoorFillingRequest,
  [DoorTypes.UPDATE_MAIN_DOOR_FILLING_SUCCESS]: updateMainDoorFillingSuccess,
  [DoorTypes.UPDATE_MAIN_DOOR_FILLING_FAILURE]: updateMainDoorFillingFailure,

  /** Sections */

  [DoorTypes.UPDATE_MAIN_SECTION_REQUEST]: updateMainSectionRequest,
  [DoorTypes.UPDATE_MAIN_SECTION_SUCCESS]: updateMainSectionSuccess,
  [DoorTypes.UPDATE_MAIN_SECTION_FAILURE]: updateMainSectionFailure,

  [DoorTypes.UPDATE_SECTION_REQUEST]: updateSectionRequest,
  [DoorTypes.UPDATE_SECTION_SUCCESS]: updateSectionSuccess,
  [DoorTypes.UPDATE_SECTION_FAILURE]: updateSectionFailure,

  [DoorTypes.ADD_SECTION_REQUEST]: addSectionRequest,
  [DoorTypes.ADD_SECTION_SUCCESS]: addSectionSuccess,
  [DoorTypes.ADD_SECTION_FAILURE]: addSectionFailure,

  [DoorTypes.COPY_SECTION_REQUEST]: copySectionRequest,
  [DoorTypes.COPY_SECTION_SUCCESS]: copySectionSuccess,
  [DoorTypes.COPY_SECTION_FAILURE]: copySectionFailure,

  [DoorTypes.MERGE_SECTION_REQUEST]: mergeSectionRequest,
  [DoorTypes.MERGE_SECTION_SUCCESS]: mergeSectionSuccess,
  [DoorTypes.MERGE_SECTION_FAILURE]: mergeSectionFailure,

  [DoorTypes.REMOVE_LAST_SECTION_REQUEST]: removeLastSectionRequest,
  [DoorTypes.REMOVE_LAST_SECTION_SUCCESS]: removeLastSectionSuccess,
  [DoorTypes.REMOVE_LAST_SECTION_FAILURE]: removeLastSectionFailure,

  [DoorTypes.ALIGN_SECTIONS_REQUEST]: alignSectionsRequest,
  [DoorTypes.ALIGN_SECTIONS_SUCCESS]: alignSectionsSuccess,
  [DoorTypes.ALIGN_SECTIONS_FAILURE]: alignSectionsFailure,

  [DoorTypes.UPDATE_MAIN_SECTION_FILLING_REQUEST]: updateMainSectionFillingRequest,
  [DoorTypes.UPDATE_MAIN_SECTION_FILLING_SUCCESS]: updateMainSectionFillingSuccess,
  [DoorTypes.UPDATE_MAIN_SECTION_FILLING_FAILURE]: updateMainSectionFillingFailure,

  [DoorTypes.UPDATE_SECTION_FILLING_REQUEST]: updateSectionFillingRequest,
  [DoorTypes.UPDATE_SECTION_FILLING_SUCCESS]: updateSectionFillingSuccess,
  [DoorTypes.UPDATE_SECTION_FILLING_FAILURE]: updateSectionFillingFailure,

  [DoorTypes.RESET_FIELDS_DEPENDENT_ON_SIDE_PROFILE]: resetFieldsDependentOnSideProfile,

  /** Modals */

  [DoorTypes.TOGGLE_COPY_DOOR_MODAL]: toggleCopyDoorModal,
  [DoorTypes.TOGGLE_MERGE_SECTION_MODAL]: toggleMergeSectionModal,
});
