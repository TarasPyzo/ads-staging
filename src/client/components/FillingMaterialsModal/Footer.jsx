import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({
  onSubmit,
  isDisabled,
}) => (
  <div className="filling-modal-footer">
    <div className="filling-modal-footer--inner">
      <button
        type="button"
        className="full-width-button"
        disabled={isDisabled}
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <span>Выбрать</span>
      </button>
    </div>
  </div>
);

Footer.defaultProps = {
  onSubmit: () => {},
  isDisabled: true,
};

Footer.propTypes = {
  onSubmit: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Footer;
