import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Tabs = ({
  tabs,
  onChange,
  className,
  activeTabIndex,
}) => {
  const rootClassName = clsx('sticky-menu-tabs', className);

  const handleChange = (e, index) => {
    e.preventDefault();

    onChange(index);
  };

  return (
    <div className={rootClassName}>
      { tabs.map((tab, index) => {
        const itemClassName = clsx('sticky-menu-tab', activeTabIndex === index && 'active');

        return (
          <a
            href="/"
            key={String(index)}
            className={itemClassName}
            onClick={(e) => handleChange(e, index)}
            disable={tab.isDisabled}
            tabIndex={0}
          >
            {tab.title}
          </a>
        );
      })}
    </div>
  );
};

Tabs.defaultProps = {
  tabs: [],
  className: null,
  activeTabIndex: 0,
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
  })),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  activeTabIndex: PropTypes.number,
};

export default Tabs;
