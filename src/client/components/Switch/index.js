/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Switch = ({
  isToggled,
  setToggleValue,
  className,
}) => {
  const toggleClassName = clsx('toggle-control', className);

  return (
    <label htmlFor="control" className={toggleClassName}>
      <input
        type="checkbox"
        checked={isToggled}
        onChange={() => {}}
      />
      <span
        className="control"
        onClick={(e) => { e.stopPropagation(); setToggleValue(!isToggled); }}
      />
    </label>
  );
};

Switch.propTypes = {
  isToggled: PropTypes.bool,
  setToggleValue: PropTypes.func,
  className: PropTypes.string,
};

Switch.defaultProps = {
  isToggled: false,
  setToggleValue: () => {},
  className: null,
};

export default Switch;
