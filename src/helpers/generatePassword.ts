import { equals } from 'ramda';
import { FiltersName, FiltersType } from '../types';

const generateStringGroup = (min: number, max: number) => {
  let group = '';
  for (let i = min; i <= max; i++) {
    group += String.fromCharCode(i);
  }
  return group;
};

// Generate a random number between min and max, included
const generateRandomNumber = (min = 0, max: number) => {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomNumber * (max - min + 1)) + min;
  // return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatePassword = (length: number, filters: FiltersType) => {
  const lowercaseGroup = generateStringGroup(97, 122);
  const uppercaseGroup = generateStringGroup(65, 90);
  const numbersGroup = generateStringGroup(48, 57);
  const symbolsGroup = ',.;!?:@#$%^~&()[]{}-_=+';
  let finalGroup = '';
  let password = '';
  let valid = false;

  const validate = (
    letter: string,
    filters: FiltersType,
    currentFilters: FiltersType
  ) => {
    if (lowercaseGroup.includes(letter)) currentFilters.lowercase = true;
    if (uppercaseGroup.includes(letter)) currentFilters.uppercase = true;
    if (numbersGroup.includes(letter)) currentFilters.numbers = true;
    if (symbolsGroup.includes(letter)) currentFilters.symbols = true;
    return equals(filters, currentFilters);
  };

  if (
    !filters.lowercase &&
    !filters.uppercase &&
    !filters.numbers &&
    !filters.symbols
  )
    return;

  if (filters.lowercase) finalGroup += lowercaseGroup;
  if (filters.uppercase) finalGroup += uppercaseGroup;
  if (filters.numbers) finalGroup += numbersGroup;
  if (filters.symbols) finalGroup += symbolsGroup;

  while (!valid) {
    password = '';
    const currentFilters = {
      [FiltersName.lowercase]: false,
      [FiltersName.uppercase]: false,
      [FiltersName.numbers]: false,
      [FiltersName.symbols]: false
    };

    for (let i = 0; i < length; i++) {
      const randomIndex = generateRandomNumber(0, finalGroup.length - 1);
      const letter = finalGroup[randomIndex];
      password += letter;
      if (!valid) {
        valid = validate(letter, filters, currentFilters);
      }
    }
  }

  return password;
};

export { generatePassword };
