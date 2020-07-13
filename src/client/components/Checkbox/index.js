/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Checkbox = ({
  isChecked,
  setCheckedValue,
  label,
  disabled,
}) => {
  const checkBoxState = clsx('checkmark', disabled && 'disabled');
  return (
    <label
      htmlFor="checkbox"
      className="container"
      onClick={disabled ? () => {} : () => setCheckedValue(!isChecked)}
    >
      {label}
      <input
        className="checkbox"
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={() => {}}
      />
      <span className={checkBoxState} />
    </label>
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  setCheckedValue: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object,
  ]),
};

Checkbox.defaultProps = {
  isChecked: false,
  disabled: false,
  setCheckedValue: () => { },
  label: null,
};

export default Checkbox;
