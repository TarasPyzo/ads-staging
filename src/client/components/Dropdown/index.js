import React from 'react';
import PropTypes from 'prop-types';
import { SimpleSelect } from 'react-selectize';
import Label from '../Label';

const Dropdown = ({
  label,
  infoTagValue,
  withInfoTag,
  options,
  onChange,
  placeholder,
  value,
  disabled,
}) => (
  <>
    {label && (
      <Label
        htmlFor="react-selectize"
        value={label}
        infoTagValue={infoTagValue}
        withInfoTag={withInfoTag}
      />
    )}
    <SimpleSelect
      value={value}
      theme="bootstrap3"
      placeholder={placeholder}
      onValueChange={onChange}
      options={options}
      disabled={disabled}
      renderValue={(item) => (
        <div className="dropdown-value">
          {!item.image || <img alt="" src={item.image} className="dropdown-value-image" />}
          <span className="dropdown-value-label">{item.label}</span>
        </div>
      )}
      renderOption={(item) => (
        <div className="dropdown-option">
          {!item.image || <img alt="" src={item.image} className="dropdown-option-image" />}
          <span className="dropdown-option-label">{item.label}</span>
        </div>
      )}
    />
  </>
);


Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
  })).isRequired,
  value: PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  withInfoTag: PropTypes.bool,
  disabled: PropTypes.bool,
  infoTagValue: PropTypes.string,
};

Dropdown.defaultProps = {
  label: null,
  value: null,
  placeholder: null,
  withInfoTag: false,
  disabled: false,
  infoTagValue: '',
};

export default Dropdown;
