import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Label = ({
  value,
  htmlFor,
  withInfoTag,
  infoTagValue,
}) => {
  const [isInfoTagOpen, switchInfoTagState] = useState(false);
  const tagClassName = clsx('label--info-tag', !isInfoTagOpen || 'active');
  const arrowClassName = clsx('label--info-tag-arrow-left', !isInfoTagOpen || 'active');

  return (
    <div className="label--wrapper">
      <label
        htmlFor={htmlFor}
      >
        {value}
      </label>
      {!withInfoTag || (
        <>
          <button
            type="button"
            className="label--info-tag-button"
            onBlur={() => switchInfoTagState(false)}
            onClick={() => switchInfoTagState(true)}
          />
          <div className={arrowClassName} />
          <div className={tagClassName}>
            {infoTagValue}
          </div>
        </>
      )}
    </div>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  value: PropTypes.string.isRequired,
  withInfoTag: PropTypes.bool,
  infoTagValue: PropTypes.string,
};

Label.defaultProps = {
  htmlFor: '',
  withInfoTag: false,
  infoTagValue: '',
};

export default Label;
