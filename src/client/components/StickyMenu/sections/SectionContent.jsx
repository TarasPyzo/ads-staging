import React from 'react';
import PropTypes from 'prop-types';

import MainSection from './MainSection';
import Section from './Section';

const SectionContent = ({
  doorNumber,
  sectionNumber,
}) => {
  const getSectionContent = () => {
    if (sectionNumber === 0) {
      return (<MainSection doorNumber={doorNumber} />);
    }

    return (
      <Section
        doorNumber={doorNumber}
        sectionNumber={sectionNumber}
      />
    );
  };

  return (
    <div className="">
      {getSectionContent()}
    </div>
  );
};

SectionContent.propTypes = {
  doorNumber: PropTypes.number.isRequired,
  sectionNumber: PropTypes.number.isRequired,
};

export default SectionContent;
