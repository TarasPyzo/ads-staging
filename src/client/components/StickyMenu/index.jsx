import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-sticky-el';

import Main from '../../containers/layout/Main';

import BottomNavPanel from './BottomNavPanel';
import Footer from './Footer';
import ScrollingContainer from './ScrollingContainer';
import Tabs from './doors/Tabs';
import TabContent from './doors/TabContent';
import Visualisation from '../Visualisation';

const StickyMenu = ({
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="extendable-system-page">
      <div className="sticky-container">
        <Main>
          <Visualisation />
        </Main>
        <div className="sticky-menu-wrapper">
          <Sticky className="sticky-menu">
            <div className="sticky-menu--offset" />
            <div className="sticky-menu--inner">
              <div className="sticky-menu--head">
                <div className="sticky-menu--snap"><span /></div>
                <Tabs
                  tabs={tabs}
                  onChange={handleTabChange}
                  activeTabIndex={activeTab}
                />
              </div>
            </div>
          </Sticky>
          <ScrollingContainer className="scroll-area">
            <>
              <TabContent
                activeTabIndex={activeTab}
              />
              <BottomNavPanel
                nextDoorNumber={activeTab + 1}
                showNext={activeTab < tabs.length - 1}
                onNavigate={handleTabChange}
              />
            </>
          </ScrollingContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

StickyMenu.defaultProps = {
  tabs: null,
};

StickyMenu.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })),
};

export default StickyMenu;
