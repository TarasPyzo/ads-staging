import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import clsx from 'clsx';

import DoorsActions from '../../../redux/actions/doorsAndSections';

import SectionSwitcher from '../sections/SectionSwitcher';
import CopyDoorModal from '../../CopyDoorModal';

const Door = ({
  doorNumber,
}) => {
  const dispatch = useDispatch();

  const {
    mainDoor: {
      doorsAmount,
    },
    doors,
    minDoorsAmount,
    isOpenCopyDoorModal,
  } = useSelector(({ doorsAndSections }) => doorsAndSections);
  const door = doors[doorNumber - 1];

  if (!door) return null;

  const deleteDoor = (e) => {
    e.preventDefault();

    const doorsAmountToChange = doorsAmount.value - 1;

    if (doorsAmountToChange < minDoorsAmount) return;

    dispatch(DoorsActions.removeDoorRequest(doorNumber - 1));

    dispatch(DoorsActions.updateMainDoorRequest({
      name: 'doorsAmount',
      value: doorsAmountToChange,
    }));
  };

  const copyDoor = (e) => {
    e.preventDefault();

    dispatch(DoorsActions.toggleCopyDoorModal(true));
  };

  return (
    <div className={clsx('tab-content', 'door-tab')}>
      <div className="tab-content--inner">
        <div className="tab-content--title-wrapper">
          <div className="tab-content--title">
            <span>Дверь </span>
            {doorNumber}
          </div>
          <div className="tab-content--action-buttons">
            <button
              type="button"
              className="rectangle"
              onClick={copyDoor}
              disabled={doorsAmount.value < 2}
            >
              <ReactSVG
                wrapper="span"
                src="/src/client/assets/icons/copy.svg"
              />
              <span className="button-label">
                &nbsp;Копировать
              </span>
            </button>
            <button
              type="button"
              className="circle"
              onClick={deleteDoor}
              disabled={doorsAmount.value <= minDoorsAmount}
            >
              <ReactSVG
                wrapper="span"
                src="/src/client/assets/icons/trash.svg"
              />
            </button>
          </div>
        </div>
        <SectionSwitcher doorNumber={doorNumber} />
      </div>

      <CopyDoorModal
        isOpen={isOpenCopyDoorModal}
        onCloseModal={() => dispatch(DoorsActions.toggleCopyDoorModal(false))}
        onCopy={(doorIndex, selectedDoors) => dispatch(DoorsActions.copyDoorRequest(doorIndex, selectedDoors))}
        doorNumber={doorNumber}
        doorsAmount={doorsAmount.value}
      />
    </div>
  );
};

Door.propTypes = {
  doorNumber: PropTypes.number.isRequired,
};

export default Door;
