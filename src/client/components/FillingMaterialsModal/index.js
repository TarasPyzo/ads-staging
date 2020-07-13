import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import clsx from 'clsx';

import manufacturersOptions from '../../helpers/manufacturersOptions';
import {
  dspUVPrintingTypes,
  manufacturersList,
  mirrorTypes,
} from '../../helpers/options';

import Modal from '../Modal';
import RadioGroup from '../RadioGroup';
import RadioOption from '../RadioOption';
import Switch from '../Switch';
import Label from '../Label';
import Dropdown from '../Dropdown';

import ManufacturersOptions from './ManufacturersOptions';
import Footer from './Footer';

const FillingMaterialsModal = ({
  isOpen,
  onCloseModal,
  activeTrigger,
  setActiveTrigger,
  setCustomersOption,
  customersOption,
  isMilling,
  setMillingToggle,
  dspOption,
  setDspOption,
  dspManufacturer,
  setDspManufacturer,
  dspSearch,
  setDspSearch,
  dspUVPrinting,
  setDspUvPrinting,
  uvPrintType,
  setUvPrintType,
  onSubmit,
}) => {
  const [manufacturers, setManufacturers] = useState(manufacturersOptions);

  const {
    customers: { customersOption: stateCustomersOption },
    dsp: { dspOption: stateDSPOption },
  } = useSelector(({ fillingMaterials }) => fillingMaterials);

  useEffect(() => {
    if (dspManufacturer) {
      const findElement = manufacturers.find((el) => el.name === dspManufacturer.toLowerCase());
      const findIndexOfElement = manufacturers.findIndex((el) => el.name === dspManufacturer.toLowerCase());
      manufacturers.splice(findIndexOfElement, 1);
      manufacturers.unshift(findElement);
      setManufacturers(() => [...manufacturers]);
    }
  }, [dspManufacturer]);

  const customersClassName = clsx(
    'trigger-wrapper',
    activeTrigger === 'customers' && 'open',
  );
  const dspClassName = clsx(
    'trigger-wrapper',
    activeTrigger === 'dsp' && 'open',
  );
  const mirrorClassName = clsx(
    'trigger-wrapper',
    activeTrigger === 'mirror' && 'open',
  );
  const glassClassName = clsx(
    'trigger-wrapper',
    activeTrigger === 'glass' && 'open',
  );

  const customersDspSmallClassName = clsx('icon icon-button-large',
    activeTrigger === 'customers' && customersOption === 'dsp-small' && 'active');

  const customersDspLargeClassName = clsx('icon icon-button-large',
    activeTrigger === 'customers' && customersOption === 'dsp-large' && 'active');

  const customersGlassClassName = clsx('icon icon-button',
    activeTrigger === 'customers' && customersOption === 'glass' && 'active');

  const triggers = {
    customers: (
      <div className={customersClassName}>
        <div className="trigger-check" />
        <img
          className="trigger-image"
          src="src/client/assets/icons/fillingMaterials/customers-material.svg"
          alt="customers"
        />
        <p className="trigger-text">Материал заказчика</p>
      </div>),
    dsp: (
      <div className={dspClassName}>
        <div className="trigger-check" />
        <img
          className="trigger-image"
          src="src/client/assets/icons/fillingMaterials/dsp.svg"
          alt="customers"
        />
        <p className="trigger-text">ДСП</p>
      </div>),
    mirror: (
      <div className={mirrorClassName}>
        <div className="trigger-check" />
        <img
          className="trigger-image"
          src="src/client/assets/icons/fillingMaterials/mirror.svg"
          alt="customers"
        />
        <p className="trigger-text">Зеркало</p>
      </div>),
    glass: (
      <div className={glassClassName}>
        <div className="trigger-check" />
        <img
          className="trigger-image"
          src="src/client/assets/icons/fillingMaterials/glass.svg"
          alt="customers"
        />
        <p className="trigger-text">Стекло</p>
      </div>),
  };

  return (
    <Modal
      closeModal={onCloseModal}
      opened={isOpen}
      type="bottom"
      className="filling-materials-modal"
    >
      <h2 className="headings-h2">Выбор наполнения</h2>
      <Collapsible
        trigger={triggers.customers}
        containerElementProps={activeTrigger === 'customers' ? { activeTrigger } : null}
        onOpening={() => setActiveTrigger('customers')}
        disabled={activeTrigger !== 'customers'}
        open={activeTrigger === 'customers'}
      >
        <RadioGroup className="icon-button">
          <RadioOption
            className={customersDspSmallClassName}
            iconPath="/src/client/assets/icons/fillingMaterials/dsp-small.svg"
            label="ДСП 10mm"
            onChange={() => setCustomersOption('dsp-small')}
          />
          <RadioOption
            className={customersDspLargeClassName}
            iconPath="/src/client/assets/icons/fillingMaterials/dsp-large.svg"
            label="ДСП 10+mm"
            onChange={() => setCustomersOption('dsp-large')}
          />
          <RadioOption
            className={customersGlassClassName}
            iconPath="/src/client/assets/icons/fillingMaterials/large-mirror.svg"
            label="Стекло"
            onChange={() => setCustomersOption('glass')}
          />
        </RadioGroup>
        {customersOption !== 'dsp-large' || (
          <div className="milling-section">
            <Label className="milling-section-title" value="Фрезерование" />
            <Switch
              isToggled={isMilling}
              setToggleValue={() => setMillingToggle(!isMilling)}
            />
          </div>
        )}
      </Collapsible>
      <Collapsible
        trigger={triggers.dsp}
        containerElementProps={activeTrigger === 'dsp' ? { activeTrigger } : null}
        onOpening={() => setActiveTrigger('dsp')}
        disabled={activeTrigger !== 'dsp'}
        open={activeTrigger === 'dsp'}
      >
        <div className="dsp-section-wrapper">
          <div className="dsp-section-inner">
            <Dropdown
              placeholder="Выбрать производителя"
              options={manufacturersList}
              onChange={(option) => setDspManufacturer(option?.value || null)}
              value={
                dspManufacturer
                  ? manufacturersList.find((item) => item.value === dspManufacturer)
                  : null
              }
            />
            <br />
            <div className="uv-print-section">
              <Label
                value="Ультрафиолетовая печать"
                infoTagValue="UV Printing"
                withInfoTag
              />
              <Switch
                isToggled={dspUVPrinting}
                setToggleValue={() => setDspUvPrinting(!dspUVPrinting)}
              />
            </div>
            <br />
            {!dspUVPrinting || (
              <>
                <Dropdown
                  placeholder="Выбрать тип"
                  options={dspUVPrintingTypes}
                  onChange={(option) => setUvPrintType(option?.value || null)}
                  value={
                    uvPrintType
                      ? dspUVPrintingTypes.find((item) => item.value === uvPrintType)
                      : null
                  }
                />
                <br />
              </>
            )}
            <div className="dsp-section-search">
              <div className="dsp-section-search-glass" />
              <input
                placeholder="Поиск по названию или артикулу"
                className="dsp-section-search-input"
                onChange={(e) => setDspSearch(e.target.value)}
                value={dspSearch}
              />
            </div>
            <div className="dsp-options-wrapper">
              {manufacturers.map((manufacturer) => (
                <div key={manufacturer.name}>
                  <p className="dsp-options-caption">{manufacturer.name}</p>
                  <RadioGroup className="image-button">
                    {manufacturer.options.map((option) => (
                      <ManufacturersOptions
                        manufacturerName={manufacturer.name}
                        optionValue={option.value}
                        optionLabel={option.label}
                        optionIcon={option.iconPath}
                        chosenOption={dspOption}
                        onClick={() => setDspOption(option.value)}
                      />
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Collapsible>
      <Collapsible
        trigger={triggers.mirror}
        containerElementProps={activeTrigger === 'mirror' ? { activeTrigger } : null}
        onOpening={() => setActiveTrigger('mirror')}
        disabled={activeTrigger !== 'mirror'}
        open={activeTrigger === 'mirror'}
      >
        <div className="mirror-section-wrapper">
          <div className="mirror-section-inner">
            <Dropdown
              placeholder="Выбрать тип"
              options={mirrorTypes}
              onChange={(option) => setDspManufacturer(option?.vlue || null)}
            />
            <br />
            <div className="uv-print-section">
              <Label
                value="Ультрафиолетовая печать"
                infoTagValue="UV Printing"
                withInfoTag
              />
              <Switch
                isToggled={dspUVPrinting}
                setToggleValue={() => setDspUvPrinting(!dspUVPrinting)}
              />
            </div>
            <br />
            {!dspUVPrinting || (
              <>
                <Dropdown
                  placeholder="Выбрать тип"
                  options={dspUVPrintingTypes}
                  onChange={setUvPrintType}
                />
                <br />
              </>
            )}
            <div className="dsp-section-search">
              <div className="dsp-section-search-glass" />
              <input
                placeholder="Поиск по названию или артикулу"
                className="dsp-section-search-input"
                onChange={(e) => setDspSearch(e.target.value)}
                value={dspSearch}
              />
            </div>
            <div className="dsp-options-wrapper">
              {/* {manufacturers.map((el) => el?.options)} */}
            </div>
          </div>
        </div>
      </Collapsible>
      <Collapsible
        trigger={triggers.glass}
        containerElementProps={activeTrigger === 'glass' ? { activeTrigger } : null}
        onOpening={() => setActiveTrigger('glass')}
        disabled={activeTrigger !== 'glass'}
        open={activeTrigger === 'glass'}
      >
        <p>It can even be another Collapsible component. Check out the next section!</p>
      </Collapsible>
      <Footer
        onSubmit={() => { onSubmit(); onCloseModal(); }}
        isDisabled={!( // TODO: change when all triggers will be ready to use
          (activeTrigger === 'customers' && stateCustomersOption)
          || (activeTrigger === 'dsp' && stateDSPOption)
        )}
      />
    </Modal>
  );
};

FillingMaterialsModal.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
  activeTrigger: PropTypes.string,
  setActiveTrigger: PropTypes.func,
  customersOption: PropTypes.string,
  setCustomersOption: PropTypes.func,
  isMilling: PropTypes.bool,
  setMillingToggle: PropTypes.func,
  dspOption: PropTypes.string,
  setDspOption: PropTypes.func,
  dspManufacturer: PropTypes.string,
  setDspManufacturer: PropTypes.func,
  dspSearch: PropTypes.string,
  setDspSearch: PropTypes.func,
  dspUVPrinting: PropTypes.bool,
  setDspUvPrinting: PropTypes.func,
  uvPrintType: PropTypes.string,
  setUvPrintType: PropTypes.func,
  onSubmit: PropTypes.func,
};

FillingMaterialsModal.defaultProps = {
  isOpen: false,
  onCloseModal: () => {},
  activeTrigger: null,
  setActiveTrigger: () => {},
  customersOption: null,
  setCustomersOption: () => {},
  isMilling: false,
  setMillingToggle: () => {},
  dspOption: null,
  setDspOption: () => {},
  dspManufacturer: null,
  setDspManufacturer: () => {},
  dspSearch: null,
  setDspSearch: () => {},
  dspUVPrinting: null,
  setDspUvPrinting: () => {},
  uvPrintType: null,
  setUvPrintType: () => {},
  onSubmit: () => {},
};

export default FillingMaterialsModal;
