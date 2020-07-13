import _ from 'lodash';

export const isValidTextField = (value, minLength, maxLength) => !_.isEmpty(value)
 && value.length >= minLength
 && value.length <= maxLength;

export const isValidNumberField = (value, minLength, maxLength) => _.inRange(value, minLength, maxLength);

export const isOnlyLetters = (value) => /^[a-zA-Z]+$/.test(value);

export const isOnlyNumbers = (value) => /^[1-9]\d*$/.test(value);
