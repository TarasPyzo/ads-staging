import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import manufacturersOptions from '../../helpers/manufacturersOptions';
import { dspUVPrintingTypes } from '../../helpers/options';
import Button from '../Button';

const FillingMaterialsControl = ({
  filling,
  onClick,
}) => {
  const renderParams = () => filling.map((material) => {
    const title = material?.material === 'customers'
      ? 'Материал заказчика'
      : 'ДСП';

    const selectedManufacturer = material?.material === 'dsp'
      ? _.chain(manufacturersOptions)
        .map('options')
        .flatten()
        .filter({ value: material?.dspOption })
        .value()
      : [];
    const selectedManufacturerOption = selectedManufacturer.length
      ? selectedManufacturer[0]?.label
      : '';

    const fillingText = material?.material === 'customers'
      ? `${material?.customersOption === 'glass'
        ? 'Стекло'
        : `ДСП ${material?.customersOption === 'dsp-small' ? '10mm' : '10+mm'}`
      }
        ${material?.isMilling ? 'Фрезерование' : ''}`

      : `${material?.manufacturer || ''} ${selectedManufacturerOption}`;

    const uvPrintType = material?.uvPrintType
      ? dspUVPrintingTypes.find((type) => type.value === material?.uvPrintType)?.label || ''
      : '';

    return (
      <div className="filling-materails-control--item">
        <div className="filling-materails-control--params-wrapper-title">
          {title}
        </div>
        <div className="filling-materails-control--params-wrapper-text">
          {fillingText}
          {material?.UVPrinting && (
            <>
              &nbsp;
              <span>Ультрафиолетовая печать</span>
              &nbsp;
              <span>
                {uvPrintType && (<span>{uvPrintType.toLowerCase()}</span>)}
              </span>
            </>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="filling-materails-control">
      {!_.isEmpty(filling[0])
        && (
          <>
            <div className="filling-materails-control--image-wrapper" />
            <div className="filling-materails-control--params-wrapper">
              {renderParams()}
              <Button
                value="Изменить"
                onClick={onClick}
              />
            </div>
          </>
        )}

      {_.isEmpty(filling[0])
        && (
          <Button
            value="Выбрать"
            onClick={onClick}
          />
        )}
    </div>
  );
};

FillingMaterialsControl.propTypes = {
  filling: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FillingMaterialsControl;
