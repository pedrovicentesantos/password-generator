enum FiltersName {
  lowercase = 'lowercase',
  uppercase = 'uppercase',
  numbers = 'numbers',
  symbols = 'symbols'
}

type FiltersType = {
  [FiltersName.lowercase]: boolean;
  [FiltersName.uppercase]: boolean;
  [FiltersName.numbers]: boolean;
  [FiltersName.symbols]: boolean;
};

export { FiltersName, FiltersType };
