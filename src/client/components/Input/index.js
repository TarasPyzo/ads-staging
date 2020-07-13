import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Label from '../Label';

const Input = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  className,
  direction,
  infoTagValue,
  withInfoTag,
  name,
}) => {
  const inputClassName = clsx('input', type, className, !_.isEmpty(error) && 'invalid');

  return (
    <div className="input--wrapper">
      {label && (
        <Label
          htmlFor={inputClassName}
          value={label}
          infoTagValue={infoTagValue}
          withInfoTag={withInfoTag}
        />
      )}
      <input
        className={inputClassName}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        style={{ textAlign: direction === 'rtl' ? 'right' : 'initial' }}
      />
      {error && error.length > 0 && (
        <span className="input--error">
          {error}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'password',
    'number',
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['rtl', 'ltr']),
  withInfoTag: PropTypes.bool,
  infoTagValue: PropTypes.string,
  name: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  placeholder: null,
  className: 'default',
  direction: 'ltr',
  type: 'text',
  error: null,
  withInfoTag: false,
  infoTagValue: '',
  value: '',
  name: null,
  onBlur: null,
};

export default Input;
