/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const Modal = ({
  children,
  opened,
  closeModal,
  type,
  className,
}) => {
  const modalClassName = clsx('modal', type, className, opened && 'open');
  const modalRef = React.createRef();

  useEffect(() => {
    if (opened) disableBodyScroll(modalRef);
    else clearAllBodyScrollLocks();
  }, [opened]);

  return (
    <div ref={modalRef} className={modalClassName}>
      <div className="modal-wrapper">
        <div className="modal-inner">
          <div className="modal-close" onClick={closeModal}>
            <button className="modal-close-button" type="button">
              <div className="modal-close-button-cross" />
            </button>
          </div>
          <div className="modal-inner-children">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  type: PropTypes.oneOf(['bottom', '']),
  opened: PropTypes.bool,
  closeModal: PropTypes.func,
  className: PropTypes.string,
};

Modal.defaultProps = {
  type: '',
  opened: false,
  closeModal: () => {},
  className: null,
};

export default Modal;
