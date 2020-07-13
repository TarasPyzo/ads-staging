import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  doorPositioningOptions,
  textures,
  stoppers,
  mechanismes,
} from '../../../helpers/options';
import aluminiumColorSet from '../../../helpers/aluminiumColorSet';
import sideProfiles from '../../../helpers/sideProfiles';
import { isValidNumberField } from '../../../helpers/validation';
import {
  defaultDoorsAmount,
  minDoorOpeningHeight,
  maxDoorOpeningHeight,
  minDoorOpeningWidth,
  maxDoorOpeningWidth,
  minDoorWidth,
  maxDoorWidth,
} from '../../../helpers/constants';

import DoorsActions from '../../../redux/actions/doorsAndSections';
import FillingMaterialsActions from '../../../redux/actions/fillingMaterials';

import RadioGroup from '../../RadioGroup';
import RadioOption from '../../RadioOption';
import Input from '../../Input';
import PlusMinusControl from '../../PlusMinusControl';
import Label from '../../Label';
import Dropdown from '../../Dropdown';
import FillingMaterialsModal from '../../FillingMaterialsModal';
import FillingMaterialsControl from '../../FillingMaterialsControl';


const MainDoor = () => {
  const dispatch = useDispatch();
  const doorOpeningHeightLabel = `(от ${minDoorOpeningHeight} до ${maxDoorOpeningHeight})`;
  const doorOpeningWidthLabel = `(от ${minDoorOpeningWidth} до ${maxDoorOpeningWidth})`;
  const [canChooseSymmetrical, setCanChooseSymmetrical] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableMechanismes, setAvailableMechanismes] = useState([]);
  const [filling, setFilling] = useState([{}]);
  const [X1, setX1] = useState(0); // X1 is a value dependent on selected side profile
  const [coversAmount, setCoversAmount] = useState(0); // this value dependent on selected side profile and door positioning

  const {
    minDoorsAmount,
    maxDoorsAmount,
    mainDoor: {
      filling: mainDoorFilling,
      mechanism,
      sideProfile,
      doorOpeningHeight,
      doorOpeningWidth,
      doorsAmount,
      doorPositioning,
      aluminiumColor,
      stopper,
      texture,
    },
    doors,
  } = useSelector(({ doorsAndSections }) => doorsAndSections);

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

  const getWidthInctudingProfile = () => {
    const width = doorOpeningWidth.value || 0;
    if (width > maxDoorOpeningWidth) return maxDoorOpeningWidth + X1 * coversAmount;
    if (width < minDoorOpeningWidth) return minDoorOpeningWidth + X1 * coversAmount;
    return width + X1 * coversAmount;
  };

  const handleMinDoorsAmount = () => {
    const widthWithProfile = getWidthInctudingProfile();
    const minAmount = Math.ceil(widthWithProfile / maxDoorWidth) < defaultDoorsAmount
      ? defaultDoorsAmount
      : Math.ceil(widthWithProfile / maxDoorWidth);

    dispatch(DoorsActions.setMinMaxDoorsAmountRequest({
      name: 'minDoorsAmount',
      value: minAmount,
    }));
  };

  const handleMaxDoorsAmount = () => {
    const widthWithProfile = getWidthInctudingProfile();
    const maxAmount = Math.floor(widthWithProfile / minDoorWidth) > 8
      ? 8
      : Math.floor(widthWithProfile / minDoorWidth);

    dispatch(DoorsActions.setMinMaxDoorsAmountRequest({
      name: 'maxDoorsAmount',
      value: maxAmount,
    }));
  };


  // Show filling materials of Main Door tab and Doors tabs
  useEffect(() => {
    const doorsFilling = doors
      .filter((door) => !_.isEmpty(door?.mainSection?.filling))
      .map((door) => door?.mainSection?.filling);

    const fillingToShow = [
      ...[mainDoorFilling],
      ...doorsFilling,
    ];

    setFilling(fillingToShow);
  }, [mainDoorFilling, doors.mainSection]);


  // Set ability to choose symmetrical schema
  useEffect(() => {
    setCanChooseSymmetrical(doorsAmount.value === 4 || doorsAmount.value === 6 || doorsAmount.value === 8);
  }, [doorsAmount.value, doorPositioning.value]);


  // Set values dependent on side profile
  useEffect(() => {
    // Reset values dependent on side profile
    if (!sideProfile?.value) {
      setAvailableColors([]);
      setAvailableMechanismes([]);
      setCoversAmount(0);
      return;
    }

    setAvailableColors(sideProfiles.find((item) => item.value === sideProfile.value)?.colors || []);
    setAvailableMechanismes(sideProfiles.find((item) => item.value === sideProfile.value)?.mechanismes || []);
    setX1(sideProfiles.find((item) => item.value === sideProfile.value)?.X1 || 0);
  }, [sideProfile.value]);


  // Set min and max doors amount
  useEffect(() => {
    if (!sideProfile?.value) {
      setCoversAmount(0);
      handleMinDoorsAmount();
      handleMaxDoorsAmount();
      return;
    }

    setCoversAmount(sideProfile.value === 'symmetrical' ? doorsAmount.value - 2 : doorsAmount.value - 1);
    handleMinDoorsAmount();
    handleMaxDoorsAmount();
  }, [doorPositioning.value, sideProfile.value, doorOpeningWidth.value]);


  // Handle doors amount to set it within the range limits specified by the min and max
  useEffect(() => {
    // Increase doors amount
    if (doorsAmount.value < minDoorsAmount) {
      dispatch(DoorsActions.increaseDoorsAmountRequest(minDoorsAmount - doorsAmount.value));
    }

    // Decrease doors amount
    if (doorsAmount.value > maxDoorsAmount) {
      dispatch(DoorsActions.decreaseDoorsAmountRequest(doorsAmount.value - maxDoorsAmount));
    }
  }, [minDoorsAmount, maxDoorsAmount]);


  // Handle doors position change dependent on doors amount
  useEffect(() => {
    if (doorPositioning.value === 'symmetrical'
      && (doorsAmount.value !== 4 && doorsAmount.value !== 6 && doorsAmount.value !== 8)) {
      dispatch(DoorsActions.updateMainDoorRequest({
        name: 'doorPositioning',
        value: 'chessboard',
      }));
    }
  }, [doorsAmount.value]);


  useEffect(() => {
    if (activeTrigger !== 'customers' || customersOption !== 'dsp-large') {
      if (isMilling) {
        dispatch(FillingMaterialsActions.setMillingToggle(false));
      }
    }
  }, [activeTrigger, customersOption]);


  const onDoorsAmountChange = (value) => {
    if (value < minDoorsAmount || value > maxDoorsAmount) return;

    dispatch(DoorsActions.updateMainDoorRequest({
      name: 'doorsAmount',
      value,
    }));

    if (value < doorsAmount.value) {
      dispatch(DoorsActions.removeDoorRequest(doors.lengh - 1));
      return;
    }
    dispatch(DoorsActions.addDoorRequest());
  };

  const handleOptions = (name, options, index) => {
    dispatch(DoorsActions.updateMainDoorRequest({
      name,
      value: options[index]?.value || options[index],
    }));
  };

  const handleDropdown = (name, selectedOption) => {
    dispatch(DoorsActions.updateMainDoorRequest({
      name,
      value: selectedOption?.value || '',
    }));
  };

  const handleSideProfileDependence = (profile) => {
    setAvailableColors(profile?.colors || []);
    setAvailableMechanismes(profile?.mechanismes || []);

    // Reset fields dependent on selected side profile
    dispatch(DoorsActions.resetFieldsDependentOnSideProfile());
  };

  const handleSubmitMainDoorFilling = () => {
    const mainDoorMaterialToSet = {
      ...fillingMaterialsState[activeTrigger],
      ...{ material: activeTrigger },
    };
    dispatch(DoorsActions.updateMainDoorFillingRequest(mainDoorMaterialToSet));
  };

  const handleUpdateNumberField = ({ target: { name, value } }) => {
    dispatch(DoorsActions.updateMainDoorRequest({
      name,
      value: +value,
    }));
  };

  const validateNumberField = ({ target: { name, value } }) => {
    const isOk = name === 'doorOpeningHeight'
      ? isValidNumberField(+value, minDoorOpeningHeight, maxDoorOpeningHeight + 1)
      : isValidNumberField(+value, minDoorOpeningWidth, maxDoorOpeningWidth + 1);

    dispatch(DoorsActions.updateMainDoorRequest({
      name,
      value: +value,
      error: isOk ? '' : 'Неверное значение',
    }));
  };

  const doorPositioningChoice = doorPositioningOptions.map((item, index) => {
    const isChecked = doorPositioning?.value === item.value;

    return (
      <RadioOption
        key={item.value}
        className={clsx(
          'icon',
          isChecked && 'checked',
          item.value === 'symmetrical' && !canChooseSymmetrical && 'disabled',
          index === 0 ? 'chessboard' : 'symmetrically',
        )}
        iconPath={item.iconPath}
        name={`${item.value}-doors-position`}
        label={item.label}
        checked={isChecked}
        disabled={item.value === 'symmetrical' && !canChooseSymmetrical}
        onChange={() => handleOptions('doorPositioning', doorPositioningOptions, index)}
      />
    );
  });

  const textureChoice = textures.map((item, index) => {
    const isChecked = texture?.value === item.value;

    return (
      <RadioOption
        key={item.value}
        className={clsx(
          'icon',
          isChecked && 'checked',
          index === 0 ? 'vertical' : 'horizontal',
        )}
        iconPath={item.iconPath}
        name={`texture-${item.value}`}
        label={item.label}
        checked={isChecked}
        onChange={() => handleOptions('texture', textures, index)}
      />
    );
  });

  const stopperChoice = stoppers.map((item, index) => {
    const isChecked = stopper?.value === item.value;

    return (
      <RadioOption
        key={item.value}
        className={clsx(
          'text-button',
          isChecked && 'checked',
          index === 0 ? 'left' : 'right',
        )}
        name={`stopper-${index}`}
        label={item.label}
        checked={isChecked}
        onChange={() => handleOptions('stopper', stoppers, index)}
      />
    );
  });

  const aluminiumColorChoice = aluminiumColorSet.map((item, index) => {
    const isChecked = aluminiumColor?.value === item.value;
    const isDisabled = availableColors.findIndex((color) => color === item.value) === -1;

    return (
      <RadioOption
        key={item.value}
        className={clsx(
          'color',
          isChecked && !isDisabled && 'checked',
          isDisabled && 'disabled',
        )}
        backgroundColor={item.color}
        name={`aluminium-color-${index}`}
        label={item.label}
        checked={isChecked && !isDisabled}
        onChange={() => handleOptions('aluminiumColor', aluminiumColorSet, index)}
        disabled={isDisabled}
      />
    );
  });

  return (
    <div className={clsx('tab-content', 'main-tab')}>
      <div className="main-tab--inner">
        <div className="main-tab--item-group">
          <div className="main-tab--item-group-caption">
            <p className="main-tab--item-group-caption-title">Высота проёма, мм</p>
            <p className="main-tab--item-group-caption-subtitle">{doorOpeningHeightLabel}</p>
          </div>
          <Input
            className="small"
            type="number"
            placeholder="0"
            direction="rtl"
            value={doorOpeningHeight?.value ?? ''}
            onChange={handleUpdateNumberField}
            onBlur={validateNumberField}
            name="doorOpeningHeight"
            error={doorOpeningHeight?.error}
          />
        </div>
        <div className="main-tab--item-group">
          <div className="main-tab--item-group-caption">
            <p className="main-tab--item-group-caption-title">Ширина проема, мм</p>
            <p className="main-tab--item-group-caption-subtitle">{doorOpeningWidthLabel}</p>
          </div>
          <Input
            className="small"
            type="number"
            placeholder="0"
            direction="rtl"
            value={doorOpeningWidth?.value ?? ''}
            onChange={handleUpdateNumberField}
            onBlur={validateNumberField}
            name="doorOpeningWidth"
            error={doorOpeningWidth?.error}
          />
        </div>
        <div className="main-tab--item-group">
          <div className="main-tab--item-group-caption">
            <p className="main-tab--item-group-caption-title">Количество дверей</p>
            <p className="main-tab--item-group-caption-subtitle">шт.</p>
          </div>
          <PlusMinusControl
            amount={doorsAmount.value}
            name="doorsAmount"
            setAmount={onDoorsAmountChange}
          />
        </div>
        <Label
          value="Схема размещения дверей"
          infoTagValue="Sample text"
          htmlFor="radio-group icons"
          withInfoTag
        />
        <RadioGroup className="icons">
          {doorPositioningChoice}
        </RadioGroup>

        <Label
          value="Боковой профиль"
          infoTagValue="Sample text"
          withInfoTag
        />
        <Dropdown
          placeholder="Выбрать профиль"
          options={sideProfiles}
          onChange={(selectedOption) => {
            handleDropdown('sideProfile', selectedOption);
            handleSideProfileDependence(selectedOption);
          }}
          value={
            sideProfile.value
              ? sideProfiles.find((item) => item.value === sideProfile.value)
              : null
          }
        />

        <Label
          value="Цвет алюминиевого профиля"
          infoTagValue="Sample text"
          withInfoTag
        />
        <RadioGroup className="color">
          {aluminiumColorChoice}
        </RadioGroup>

        <Label
          value="Механизм"
          infoTagValue="Sample text"
          withInfoTag
        />
        <Dropdown
          placeholder="Выбрать механизм"
          disabled={!sideProfile?.value}
          options={availableMechanismes.length
            ? mechanismes.filter((m) => availableMechanismes.findIndex((item) => item === m.value) !== -1)
            : []}
          onChange={(selectedOption) => handleDropdown('mechanism', selectedOption)}
          value={
            mechanism.value
              ? mechanismes.find((item) => item.value === mechanism.value)
              : null
          }
        />

        <Label
          value="Стопор"
        />
        <RadioGroup className="text-button">
          {stopperChoice}
        </RadioGroup>

        <Label
          value="Материал наполнения"
          infoTagValue="Sample text"
          withInfoTag
        />
        <FillingMaterialsControl
          filling={filling}
          onClick={() => dispatch(FillingMaterialsActions.toggleFillingMaterialModal(true))}
        />

        { (mainDoorFilling?.material === 'customers' && customersOption !== 'glass')
          || mainDoorFilling?.material === 'dsp'
          ? (
            <>
              <Label
                value="Текстура"
                infoTagValue="Sample text"
                withInfoTag
              />
              <RadioGroup className="icons">
                {textureChoice}
              </RadioGroup>
            </>
          ) : null}
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
        onSubmit={handleSubmitMainDoorFilling}
      />
    </div>
  );
};

export default MainDoor;
