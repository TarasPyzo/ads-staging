import React from 'react';
import { useSelector } from 'react-redux';
import { useTitle } from 'hookrouter';

import StickyMenu from '../../components/StickyMenu';

const ExtendableSystem = () => {
  useTitle('Extendable System');

  const { doors } = useSelector(({ doorsAndSections }) => doorsAndSections);

  const tabsLabels = doors.map((door, i) => ({ title: `ДВЕРЬ ${i + 1}` }));
  tabsLabels.unshift({ title: 'ОСНОВНЫЕ' });

  return (
    <StickyMenu tabs={tabsLabels} />
  );
};

export default ExtendableSystem;
