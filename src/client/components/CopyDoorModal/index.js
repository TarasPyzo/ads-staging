import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Checkbox from '../Checkbox';

const CopyDoorModal = ({
  isOpen,
  onCloseModal,
  onCopy,
  className,
  doorNumber,
  doorsAmount,
}) => {
  const subHeader = `Дверь ${doorNumber} -`;
  const [checkedItems, setCheckedItems] = useState({});

  const checkboxes = Array
    .from(Array(doorsAmount))
    .map((door, index) => ({
      index,
    }))
    .filter((item) => item.index !== doorNumber - 1);

  const handleApply = () => {
    const selectedDoors = _.keys(_.pickBy(checkedItems));
    onCopy(doorNumber - 1, selectedDoors);
    onCloseModal();
  };

  const handleChange = (index, isChecked) => {
    setCheckedItems({ ...checkedItems, [index]: isChecked });
  };

  const renderCheckboxes = () => checkboxes.map((item) => (
    <Checkbox
      key={item.index}
      setCheckedValue={(isChecked) => handleChange(item.index, isChecked)}
      label={(
        <span>
          Применить к
          &nbsp;
          <b>
            ДВЕРЬ
            &nbsp;
            <span>{item.index + 1}</span>
          </b>
        </span>
      )}
      isChecked={checkedItems[item.index]}
    />
  ));

  return (
    <Modal
      opened={isOpen}
      closeModal={onCloseModal}
      className={className}
    >
      <h2 className="headings-h2">Копировать</h2>
      <div className="content-wrapper">
        <p>
          <span><b>{subHeader}</b></span>
          &nbsp;
          <span>скопировать настройки:</span>
        </p>
        {renderCheckboxes()}
      </div>
      <div className="action-buttons">
        <div className="action-buttons-inner">
          <button
            type="button"
            className="link-button"
            onClick={onCloseModal}
          >
            <span>Отмена</span>
          </button>
          <button
            type="button"
            className="blue-button"
            onClick={handleApply}
            disabled={!_.keys(_.pickBy(checkedItems)).length}
          >
            <span>Применить</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

CopyDoorModal.defaultProps = {
  isOpen: false,
  className: 'sticky-action-modal',
};

CopyDoorModal.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  doorNumber: PropTypes.number.isRequired,
  doorsAmount: PropTypes.number.isRequired,
};

export default CopyDoorModal;
