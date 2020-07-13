import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

const BottomNavPanel = ({
  nextDoorNumber,
  showNext,
  onNavigate,
}) => {
  const nextButtonText = `Дверь ${nextDoorNumber}`;

  const handleNavigate = (e) => {
    e.preventDefault();

    onNavigate(nextDoorNumber);
  };

  return (
    <div className="configurator-bottom-nav">
      <div className="configurator-bottom-nav--inner">
        <div className="configurator-bottom-nav--action-link">
          Сохранить проект
        </div>
        <div
          className="configurator-bottom-nav--next-button"
          onClick={handleNavigate}
          onKeyPress={() => {}}
          role="button"
          tabIndex={0}
        >
          { showNext
            && (
              <>
                <span>{nextButtonText}</span>
                <ReactSVG
                  src="/src/client/assets/icons/rounded-arrow-next.svg"
                  wrapper="span"
                  className="configurator-bottom-nav--next-icon"
                />
              </>
            )}
        </div>
      </div>
    </div>
  );
};

BottomNavPanel.defaultProps = {
  nextDoorNumber: 1,
  showNext: true,
  onNavigate: () => {},
};

BottomNavPanel.propTypes = {
  nextDoorNumber: PropTypes.number,
  showNext: PropTypes.bool,
  onNavigate: PropTypes.func,
};

export default BottomNavPanel;
