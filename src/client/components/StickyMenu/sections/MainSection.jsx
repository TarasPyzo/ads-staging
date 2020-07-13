import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  doorLatchMechanismPositionOptions,
  doorLatchMechanismes,
  directionOfSectionsOptions,
} from '../../../helpers/options';

import sideProfiles from '../../../helpers/sideProfiles';
import connectingProfiles from '../../../helpers/connectingProfiles';

import DoorsActions from '../../../redux/actions/doorsAndSections';
import FillingMaterialsActions from '../../../redux/actions/fillingMaterials';

import RadioGroup from '../../RadioGroup';
import RadioOption from '../../RadioOption';
import PlusMinusControl from '../../PlusMinusControl';
import Label from '../../Label';
import Switch from '../../Switch';
import Dropdown from '../../Dropdown';
import FillingMaterialsControl from '../../FillingMaterialsControl';
import FillingMaterialsModal from '../../FillingMaterialsModal';


const MainSection = ({
  doorNumber,
}) => {
  const dispatch = useDispatch();

  const {
    minSectionsAmount,
    maxSectionsAmount,
    mainDoor,
    doors,
  } = useSelector(({ doorsAndSections }) => doorsAndSections);
  const door = doors[doorNumber - 1];

  const [availableConnectingProfiles, setAvailableConnectingProfiles] = useState([]);

  if (!door) return null;

  const {
    sideProfile,
    doorOpeningHeight,
    doorOpeningWidth,
  } = mainDoor;

  const {
    mainSection: {
      sectionsAmount,
      isDoorLatchMechanismOn,
      doorLatchMechanism,
      doorLatchMechanismPosition,
      isDoorAssemblingOn,
      directionOfSections,
      connectingProfile,
      filling,
    },
  } = door;

  const fillingMaterialsState = useSelector(({ fillingMaterials }) => fillingMaterials);

  const {
    activeTrigger,
    customers: {
      customersOption,
      isMilling,
    },
    dsp: {
      manufacturer,
      UVPrinting,
      searchField,
      dspOption,
      uvPrintType,
    },
    isOpenFillingModal,
  } = fillingMaterialsState;

  useEffect(() => {
    if (!sideProfile?.value) {
      setAvailableConnectingProfiles([]);
      return;
    }

    setAvailableConnectingProfiles(sideProfiles.find((item) => item.value === sideProfile.value)
      ?.connectingProfiles || []);
  }, [sideProfile.value]);

  const handleSectionsAmount = (value) => {
    if (!_.isEmpty(doorOpeningHeight.error) || !_.isEmpty(doorOpeningWidth.error)) return;
    if (value < minSectionsAmount || value > maxSectionsAmount) return;

    if (value < sectionsAmount.value) {
      dispatch(DoorsActions.removeLastSectionRequest(doorNumber - 1));
      return;
    }
    dispatch(DoorsActions.addSectionRequest(doorNumber - 1));
  };

  const updateMainSectionField = (name, value) => {
    dispatch(DoorsActions.updateMainSectionRequest(
      doorNumber - 1,
      {
        name,
        value,
      },
    ));
  };

  const handleOptions = (name, options, index) => {
    dispatch(DoorsActions.updateMainSectionRequest(
      doorNumber - 1,
      {
        name,
        value: options[index]?.value || options[index],
      },
    ));
  };

  const handleDropdown = (name, selectedOption) => {
    dispatch(DoorsActions.updateMainSectionRequest(
      doorNumber - 1,
      {
        name,
        value: selectedOption?.label || '',
      },
    ));
  };

  const handleSubmitMainSectionFilling = () => {
    const mainSectionMaterialToSet = {
      ...fillingMaterialsState[activeTrigger],
      ...{ material: activeTrigger },
    };
    dispatch(DoorsActions.updateMainSectionFillingRequest(
      doorNumber - 1,
      mainSectionMaterialToSet,
    ));
  };

  const doorLatchMechanismChoice = doorLatchMechanismPositionOptions.map((item, index) => {
    let buttonStylePlace = '';
    switch (index) {
      case 0: buttonStylePlace = 'left'; break;
      case 1: buttonStylePlace = 'middle'; break;
      case 2: buttonStylePlace = 'right'; break;
      default: break;
    }
    const isChecked = doorLatchMechanismPosition?.value === item.value;

    return (
      <RadioOption
        key={item.value}
        className={clsx('text-button', isChecked && 'checked', buttonStylePlace)}
        name={`doorLatchMechanismPosition-${index}`}
        label={item.label}
        checked={isChecked}
        onChange={() => handleOptions('doorLatchMechanismPosition', doorLatchMechanismPositionOptions, index)}
      />
    );
  });

  const directionOfSectionsChoice = directionOfSectionsOptions.map((item, index) => {
    const isChecked = directionOfSections?.value === item.value;

    return (
      <RadioOption
        key={item.value}
        className={clsx(
          'text-button',
          isChecked && 'checked',
          index === 0 ? 'left' : 'right',
        )}
        name={`directionOfSections-${index}`}
        label={item.label}
        checked={isChecked}
        onChange={() => {
          if (!_.isEmpty(doorOpeningHeight.error) || !_.isEmpty(doorOpeningWidth.error)) return;
          handleOptions('directionOfSections', directionOfSectionsOptions, index);
          dispatch(DoorsActions.alignSectionsRequest(doorNumber - 1));
        }}
      />
    );
  });

  return (
    <div className={clsx('section-content', 'main-section')}>
      <div className="main-section--inner">
        <div className="main-section--row-space-between">
          <Label
            value="Доводчик двери"
            infoTagValue="Sample text"
            htmlFor="toggle-control door-latch-mechanism"
            withInfoTag
          />
          <Switch
            className="door-latch-mechanism"
            isToggled={isDoorLatchMechanismOn.value}
            setToggleValue={() => updateMainSectionField('isDoorLatchMechanismOn', !isDoorLatchMechanismOn.value)}
          />
        </div>
        { isDoorLatchMechanismOn.value
          && (
            <>
              <Dropdown
                placeholder="Доводчик двери"
                options={doorLatchMechanismes}
                value={
                  doorLatchMechanism.value
                    ? doorLatchMechanismes.find((item) => item.label === doorLatchMechanism.value)
                    : null
                }
                onChange={(selectedOption) => handleDropdown('doorLatchMechanism', selectedOption)}
              />
              <RadioGroup className="text-button">
                {doorLatchMechanismChoice}
              </RadioGroup>
            </>
          )}

        <div className="main-section--column">
          <Label
            value="Материал наполнения"
            infoTagValue="Sample text"
            withInfoTag
          />
          <FillingMaterialsControl
            filling={[filling]}
            onClick={() => dispatch(FillingMaterialsActions.toggleFillingMaterialModal(true))}
          />
        </div>

        <div className="main-section--item-group">
          <div className="main-section--item-group-caption">
            <p className="main-section--item-group-caption-title">Количество секций</p>
            <p className="main-section--item-group-caption-subtitle">шт.</p>
          </div>
          <PlusMinusControl
            amount={sectionsAmount.value}
            name="sectionsAmount"
            setAmount={handleSectionsAmount}
          />
        </div>

        { sectionsAmount.value
          ? (
            <>
              <Label value="Направление разделения на секции" />
              <RadioGroup className="text-button">
                {directionOfSectionsChoice}
              </RadioGroup>
              <Label
                value="Соеденительный профиль"
                infoTagValue="Sample text"
                withInfoTag
              />
              <Dropdown
                placeholder="Выбрать профиль"
                disabled={!sideProfile?.value}
                options={availableConnectingProfiles.length
                  ? connectingProfiles.filter((cp) => availableConnectingProfiles
                    .findIndex((item) => item === cp.value) !== -1)
                  : []}
                value={
                  connectingProfile.value
                    ? connectingProfiles.find((item) => item.label === connectingProfile.value)
                    : null
                }
                onChange={(selectedOption) => handleDropdown('connectingProfile', selectedOption)}
              />
            </>
          )
          : null }

        <div className="main-section--row-space-between">
          <Label
            value="Сборка двери"
            infoTagValue="Sample text"
            htmlFor="toggle-control door-assembling"
            withInfoTag
          />
          <Switch
            className="door-assembling"
            isToggled={isDoorAssemblingOn.value}
            setToggleValue={() => updateMainSectionField('isDoorAssemblingOn', !isDoorAssemblingOn.value)}
          />
        </div>
      </div>
      <br />

      <FillingMaterialsModal
        isOpen={isOpenFillingModal}
        onCloseModal={() => dispatch(FillingMaterialsActions.toggleFillingMaterialModal(false))}
        activeTrigger={activeTrigger}
        setActiveTrigger={(trigger) => dispatch(FillingMaterialsActions.setActiveTrigger(trigger))}
        setCustomersOption={(option) => dispatch(FillingMaterialsActions.setCustomersOption(option))}
        customersOption={customersOption}
        isMilling={isMilling}
        setMillingToggle={(isOn) => dispatch(FillingMaterialsActions.setMillingToggle(isOn))}
        dspOption={dspOption}
        setDspOption={(option) => dispatch(FillingMaterialsActions.setDspOption(option))}
        dspManufacturer={manufacturer}
        setDspManufacturer={(manufacture) => dispatch(FillingMaterialsActions.setDspManufacturer(manufacture))}
        dspSearch={searchField}
        setDspSearch={(search) => dispatch(FillingMaterialsActions.setDspSearch(search))}
        dspUVPrinting={UVPrinting}
        setDspUvPrinting={(isOn) => dispatch(FillingMaterialsActions.setDspUvPrinting(isOn))}
        uvPrintType={uvPrintType}
        setUvPrintType={(printType) => dispatch(FillingMaterialsActions.setUvPrintType(printType))}
        onSubmit={handleSubmitMainSectionFilling}
      />
    </div>
  );
};

MainSection.propTypes = {
  doorNumber: PropTypes.number.isRequired,
};

export default MainSection;
