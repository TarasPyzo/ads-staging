import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import clsx from 'clsx';

import DoorsActions from '../../../redux/actions/doorsAndSections';
import FillingMaterialsActions from '../../../redux/actions/fillingMaterials';

import { textures } from '../../../helpers/options';
import { isValidNumberField } from '../../../helpers/validation';

import FillingMaterialsModal from '../../FillingMaterialsModal';
import FillingMaterialsControl from '../../FillingMaterialsControl';
import MergeSectionModal from '../../MergeSectionModal';
import RadioOption from '../../RadioOption';
import Label from '../../Label';
import Button from '../../Button';
import Input from '../../Input';


const Section = ({
  doorNumber,
  sectionNumber,
}) => {
  const dispatch = useDispatch();

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

  const {
    mainDoor,
    doors,
    isOpenMergeSectionModal,
  } = useSelector(({ doorsAndSections }) => doorsAndSections);

  const {
    doorOpeningHeight,
    doorOpeningWidth,
  } = mainDoor;
  const door = doors[doorNumber - 1];
  const sectionsAmount = door?.mainSection?.sectionsAmount?.value;
  const directionOfSections = door.mainSection?.directionOfSections?.value;
  const section = door.sections[sectionNumber - 1] || {};
  const {
    visibleHeight,
    visibleWidth,
    texture,
    filling,
  } = section;

  const handleOptions = (name, options, index) => {
    dispatch(DoorsActions.updateSectionRequest(
      doorNumber - 1,
      sectionNumber - 1,
      {
        name,
        value: options[index]?.label || options[index],
      },
    ));
  };

  const textureChoice = textures.map((item, index) => {
    const isChecked = texture?.value === item.value;

    return (
      <RadioOption
        key={item.label}
        className={clsx(
          'icon',
          isChecked && 'checked',
          index === 0 ? 'vertical' : 'horizontal',
        )}
        iconPath={item.iconPath}
        name={`texture-${index}`}
        label={item.label}
        checked={isChecked}
        onChange={() => handleOptions('texture', textures, index)}
      />
    );
  });

  const mergeSection = (e) => {
    e.preventDefault();

    dispatch(DoorsActions.toggleMergeSectionModal(true));
  };

  const copySection = (e) => {
    e.preventDefault();

    dispatch(DoorsActions.copySectionRequest(doorNumber - 1, sectionNumber - 1));
  };
  const handleUpdateField = ({ target: { name, value } }) => {
    dispatch(DoorsActions.updateSectionRequest(
      doorNumber - 1,
      sectionNumber - 1,
      {
        name,
        value: +value,
      },
    ));
  };

  const validateField = ({ target: { name, value } }) => {
    const isOk = name === 'doorOpeningHeight'
      ? isValidNumberField(+value, 1, doorOpeningHeight.value)
      : isValidNumberField(+value, 1, doorOpeningWidth.value);

    dispatch(DoorsActions.updateSectionRequest(
      doorNumber - 1,
      sectionNumber - 1,
      {
        name,
        value: +value,
        error: isOk ? '' : 'Неверное значение',
      },
    ));
  };

  const handleAlignSections = () => {
    if (!_.isEmpty(doorOpeningHeight.error) || !_.isEmpty(doorOpeningWidth.error)) return;
    dispatch(DoorsActions.alignSectionsRequest(doorNumber - 1));
  };

  const handleSubmitSectionFilling = () => {
    const sectionMaterialToSet = {
      ...fillingMaterialsState[activeTrigger],
      ...{ material: activeTrigger },
    };
    dispatch(DoorsActions.updateSectionFillingRequest(
      doorNumber - 1,
      sectionNumber - 1,
      sectionMaterialToSet,
    ));
  };

  return (
    <div className={clsx('section-content', 'section')}>
      <div className="section-content--inner">
        <div className="section-content--title-wrapper">
          <div className="section-content--title">
            <span>Секция </span>
            <span>{sectionNumber}</span>
          </div>
          <div className="section-content--action-buttons">
            <button
              type="button"
              className="circle"
              onClick={copySection}
            >
              <ReactSVG
                wrapper="span"
                src="/src/client/assets/icons/copy.svg"
              />
            </button>
            <button
              type="button"
              className="circle"
              onClick={mergeSection}
              disabled={sectionsAmount <= 2}
            >
              <ReactSVG
                wrapper="span"
                src="/src/client/assets/icons/trash.svg"
              />
            </button>
          </div>
        </div>

        { directionOfSections === 'horizontal'
          && (
            <div className="section--item-group">
              <div className="section--item-group-caption">
                <p className="section--item-group-caption-title">Видимая высота, мм</p>
                <p className="section--item-group-caption-subtitle">
                  <Button
                    value="Выровнять по высоте"
                    onClick={handleAlignSections}
                  />
                </p>
              </div>
              <Input
                className="small"
                type="number"
                placeholder="0"
                direction="rtl"
                value={visibleHeight?.value || ''}
                onChange={handleUpdateField}
                onBlur={validateField}
                name="visibleHeight"
                error={visibleHeight?.error}
              />
            </div>
          )}

        { directionOfSections === 'vertical'
          && (
            <div className="section--item-group">
              <div className="section--item-group-caption">
                <p className="section--item-group-caption-title">Видимая ширина, мм</p>
                <p className="section--item-group-caption-subtitle">
                  <Button
                    value="Выровнять по ширине"
                    onClick={handleAlignSections}
                  />
                </p>
              </div>
              <Input
                className="small"
                type="number"
                placeholder="0"
                direction="rtl"
                value={visibleWidth?.value || ''}
                onChange={handleUpdateField}
                onBlur={validateField}
                name="visibleWidth"
                error={visibleWidth?.error}
              />
            </div>
          )}

        <div className="section--column">
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

        { (filling?.material === 'customers' && customersOption !== 'glass')
          || filling?.material === 'dsp'
          ? (
            <>
              <Label
                value="Текстура"
                infoTagValue="Sample text"
                withInfoTag
              />
              <div className="section--row">
                {textureChoice}
              </div>
            </>
          ) : null}
      </div>

      <MergeSectionModal
        isOpen={isOpenMergeSectionModal}
        onCloseModal={() => dispatch(DoorsActions.toggleMergeSectionModal(false))}
        onMerge={(doorIndex, sectionIndexToRemove, mergeOption) => dispatch(
          DoorsActions.mergeSectionRequest(
            doorIndex,
            sectionIndexToRemove,
            mergeOption,
          ),
        )}
        doorNumber={doorNumber}
        sectionNumber={sectionNumber}
      />

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
        onSubmit={handleSubmitSectionFilling}
      />
    </div>
  );
};

Section.propTypes = {
  doorNumber: PropTypes.number.isRequired,
  sectionNumber: PropTypes.number.isRequired,
};

export default Section;
