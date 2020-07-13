import React, { useState, useEffect } from 'react';
import { A, getPath, getWorkingPath } from 'hookrouter';
import { useDispatch, useSelector } from 'react-redux';

import NavigationActions from '../../redux/actions/navigation';

const Header = () => {
  const [desktopView, setDesktopView] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(({ navigation }) => ({ navigation }));
  const { isMenuOpen } = state.navigation;

  const openBurgerMenu = (e) => {
    e.preventDefault();

    dispatch(NavigationActions.openNavigation());
  };

  const closeBurgerMenu = (e) => {
    e.preventDefault();

    dispatch(NavigationActions.closeNavigation());
  };

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window || {};

      if (innerWidth > 500) {
        setDesktopView(true);
        return;
      }

      setDesktopView(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    setHasHistory(getPath() !== getWorkingPath());

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header role="banner" className="header">
      <div className="header--inner">
        { desktopView && (
          <A href="/" className="header--logo">
            <img
              src="src/client/assets/images/logo.png"
              alt="ADS"
              width="76"
              height="27"
            />
          </A>
        )}
        { !desktopView && (
          <div className={hasHistory
            ? 'header--mobile'
            : 'header--mobile single-button'}
          >
            { hasHistory && (
              <A
                href={getPath()}
                className="header--back-icon"
              >
                <img
                  src="src/client/assets/icons/header/arrow-back.svg"
                  alt="Back"
                  width="17.95"
                  height="18"
                />
              </A>
            )}
            <div className="header--mobile-button">
              { isMenuOpen && (
                <a
                  href="/"
                  onClick={closeBurgerMenu}
                >
                  <img
                    src="src/client/assets/icons/header/close-menu.svg"
                    alt="Close menu"
                  />
                </a>
              )}
              { isMenuOpen || (
                <a
                  href="/"
                  onClick={openBurgerMenu}
                >
                  <img
                    src="src/client/assets/icons/header/burger-menu.svg"
                    alt="Open menu"
                  />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
