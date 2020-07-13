import React from 'react';

const Footer = () => (
  <div className="configurator-footer">
    <div className="configurator-footer--inner">
      <div className="configurator-footer--price">
        <span>0 грн.</span>
      </div>
      <button type="button" disabled>
        <span>Оформить</span>
      </button>
    </div>
  </div>
);

export default Footer;
