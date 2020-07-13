import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { mergeSectionOptions } from '../../helpers/options';

import Modal from '../Modal';
import Dropdown from '../Dropdown';


const MergeSectionModal = ({
  isOpen,
  onCloseModal,
  onMerge,
  className,
  doorNumber,
  sectionNumber,
}) => {
  const [mergeOption, setMergeOption] = useState(null);

  const handleDropdown = (selectedOption) => {
    setMergeOption(selectedOption?.value);
  };

  const handleMerge = () => {
    onMerge(doorNumber - 1, sectionNumber - 1, mergeOption);
    onCloseModal();
  };

  return (
    <Modal
      opened={isOpen}
      closeModal={onCloseModal}
      className={className}
    >
      <h2 className="headings-h2">Копировать</h2>
      <div className="content-wrapper">
        <p>
          <span>Объединить секцию:</span>
        </p>
        <Dropdown
          options={mergeSectionOptions}
          onChange={handleDropdown}
          value={
            mergeOption
              ? mergeSectionOptions.find((item) => item.value === mergeOption)
              : null
          }
        />
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
            onClick={handleMerge}
            disabled={_.isEmpty(mergeOption)}
          >
            <span>Удалить</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

MergeSectionModal.defaultProps = {
  isOpen: false,
  className: 'sticky-action-modal',
};

MergeSectionModal.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired,
  onMerge: PropTypes.func.isRequired,
  doorNumber: PropTypes.number.isRequired,
  sectionNumber: PropTypes.number.isRequired,
};

export default MergeSectionModal;
