import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
  value,
  type,
  onClick,
}) => {
  const buttonClassName = clsx('button', type);

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type="button"
    >
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text-blue']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'text-blue',
};

export default Button;
