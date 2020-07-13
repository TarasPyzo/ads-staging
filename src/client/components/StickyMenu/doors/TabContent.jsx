import React from 'react';
import PropTypes from 'prop-types';

import MainDoor from './MainDoor';
import Door from './Door';

const TabContent = ({
  activeTabIndex,
}) => {
  const getTabContent = () => {
    if (activeTabIndex === 0) {
      return (<MainDoor />);
    }

    return (
      <Door doorNumber={activeTabIndex} />
    );
  };

  return (
    <div className="">
      {getTabContent()}
    </div>
  );
};

TabContent.defaultProps = {
  activeTabIndex: 0,
};

TabContent.propTypes = {
  activeTabIndex: PropTypes.number,
};

export default TabContent;
