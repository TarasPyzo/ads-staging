import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import DoorsActions from '../../../redux/actions/doorsAndSections';

import SectionContent from './SectionContent';

const SectionSwitcher = ({
  doorNumber,
}) => {
  const dispatch = useDispatch();

  const { doors, mainDoor, maxSectionsAmount } = useSelector(({ doorsAndSections }) => doorsAndSections);
  const {
    doorOpeningHeight,
    doorOpeningWidth,
  } = mainDoor;
  const door = doors[doorNumber - 1];
  const {
    mainSection: {
      sectionsAmount,
    },
    sections = [],
  } = door;

  const sectionsLabels = sections.map((section, i) => ({ title: `${doorNumber}.${i + 1}` }));
  sectionsLabels.unshift({ title: 'Основная' });

  const [activeSection, setActiveSection] = useState(0);

  const handleSwitch = (e, index) => {
    e.preventDefault();

    setActiveSection(index);
  };

  const handleAddSection = (e) => {
    e.preventDefault();

    if (!_.isEmpty(doorOpeningHeight.error) || !_.isEmpty(doorOpeningWidth.error)) return;

    const currentSectionsAmount = sectionsAmount?.value || 0;

    if (currentSectionsAmount > maxSectionsAmount) return;

    dispatch(DoorsActions.addSectionRequest(doorNumber - 1));
  };

  const addSectionButton = () => (
    <a
      href="/"
      className={clsx('tab-section', 'add-button', sections.length && 'small')}
      onClick={handleAddSection}
    >
      <img src="/src/client/assets/icons/rounded-white-plus.svg" alt="+" />
      {!sections.length
        && (<span>Добавить секцию</span>)}
    </a>
  );

  return (
    <div className="tab-sections">
      <div className="tab-sections--inner">
        <div className="tab-sections--head">
          { sectionsLabels.map((section, index) => {
            const sectionClassName = clsx('tab-section', activeSection === index && 'active');
            return (
              <a
                href="/"
                key={String(index)}
                className={sectionClassName}
                onClick={(e) => handleSwitch(e, index)}
                disable={section.disable}
                tabIndex={0}
              >
                { section.type === 'add-button'
                  && (
                    <img src="/src/client/assets/icons/rounded-white-plus.svg" alt="+" />
                  )}
                <span>{section.title}</span>
              </a>
            );
          })}
          {(sectionsAmount.value < maxSectionsAmount) && addSectionButton()}
        </div>
        <SectionContent
          doorNumber={doorNumber}
          sectionNumber={activeSection}
        />
      </div>
    </div>
  );
};

SectionSwitcher.propTypes = {
  doorNumber: PropTypes.number.isRequired,
};

export default SectionSwitcher;
