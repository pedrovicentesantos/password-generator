import { useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { Container } from './components';
import { Checkbox } from './components/Checkbox/Checkbox';
import { filtersName } from './types';

const defaultLength = 8;

const App: React.FC = () => {
  const [password, setPassword] = useState('longpasswordwithnumbersandletters');

  const [length, setLength] = useState(defaultLength);
  const [filters, setFilters] = useState({
    [filtersName.lowercase]: true,
    [filtersName.uppercase]: true,
    [filtersName.numbers]: true,
    [filtersName.symbols]: false
  });

  const handleCheckboxChange = (name: filtersName) => {
    setFilters({ ...filters, [name]: !filters[name] });
  };

  const handleChangeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container handleSubmit={handleSubmit}>
      <section className="container-password">
        <span className="password">{password}</span>
        <span className="icon">
          <FiClipboard size={18} />
        </span>
      </section>
      <section className="container-filters">
        <div className="length-wrapper">
          <label>Tamanho:</label>
          <input
            required
            min={4}
            max={50}
            type="number"
            value={length}
            onChange={handleChangeLength}
          />
        </div>
        <Checkbox
          name={filtersName.lowercase}
          label="Incluir letras minúsculas"
          checked={filters[filtersName.lowercase]}
          handleChange={handleCheckboxChange}
        />
        <Checkbox
          name={filtersName.uppercase}
          label="Incluir letras maiúsculas"
          checked={filters[filtersName.uppercase]}
          handleChange={handleCheckboxChange}
        />
        <Checkbox
          name={filtersName.numbers}
          label="Incluir números"
          checked={filters[filtersName.numbers]}
          handleChange={handleCheckboxChange}
        />
        <Checkbox
          name={filtersName.symbols}
          label="Incluir caracteres especiais"
          checked={filters[filtersName.symbols]}
          handleChange={handleCheckboxChange}
        />
      </section>
      <section className="action">
        <button>Gerar</button>
      </section>
    </Container>
  );
};

export default App;
