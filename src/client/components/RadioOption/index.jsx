/* eslint jsx-a11y/label-has-associated-control: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ReactSVG } from 'react-svg';

const RadioOption = ({
  name,
  label,
  iconPath,
  backgroundColor,
  checked,
  disabled,
  className,
  onChange,
  onKeyPress,
}) => {
  const rootClassName = clsx('radio-option', className);

  const handleClick = (e) => {
    e.preventDefault();

    if (disabled) return;
    onChange();
  };

  return (
    <div
      className={rootClassName}
      onClick={handleClick}
      onKeyPress={onKeyPress}
      role="button"
      tabIndex={0}
      disabled={disabled}
    >
      <div className="radio-option--inner">
        <input
          type="radio"
          checked={checked}
          id={name}
          name={name}
          onChange={() => {}}
        />
        <label htmlFor={name}>
          { className.includes('icon')
            && (
              <ReactSVG src={iconPath} />
            )}
          { className.includes('color')
            && (
              <div className="radio-option--background-wrapper">
                <div
                  className="radio-option--background"
                  style={{
                    background: checked
                      ? `url('/src/client/assets/icons/check-mark-blue.svg') no-repeat center, ${backgroundColor}`
                      : backgroundColor,
                  }}
                />
                <div
                  className="radio-option--hidden-background"
                  style={{ background: backgroundColor }}
                />
              </div>
            )}
          { className.includes('image-button')
            && (
              <>
                <img alt={name} src={iconPath} />
                <div
                  className="radio-option--background"
                  style={{
                    background: checked
                      || "url('/src/client/assets/icons/check-mark-blue.svg') no-repeat center, transparent",
                  }}
                />
              </>
            )}
          { className.includes('icon-button')
            && (
              <span className="radio-option--icon-button-title">{label}</span>
            )}
          { className.includes('text-button')
            && (
              <span className="radio-option--button-title">{label}</span>
            )}
        </label>
      </div>
      { !className.includes('text-button') && !className.includes('icon-button') && label
        && (
          <div className="radio-option--label">
            <span>{label}</span>
          </div>
        )}
    </div>
  );
};

RadioOption.defaultProps = {
  name: 'radio-option',
  label: null,
  iconPath: null,
  backgroundColor: null,
  checked: false,
  disabled: false,
  onKeyPress: () => {},
};

RadioOption.propTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  name: PropTypes.string,
  iconPath: PropTypes.string,
  backgroundColor: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default RadioOption;
