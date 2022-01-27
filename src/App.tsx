import { useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { Container } from './components';
import { Checkbox } from './components/Checkbox/Checkbox';
import { copyTextToClipboard } from './helpers/copyToClipboard';
import { generatePassword } from './helpers/generatePassword';
import { FiltersName, FiltersType } from './types';

const defaultLength = 8;

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(defaultLength);
  const [filters, setFilters] = useState<FiltersType>({
    [FiltersName.lowercase]: true,
    [FiltersName.uppercase]: true,
    [FiltersName.numbers]: true,
    [FiltersName.symbols]: true
  });

  const handleCheckboxChange = (name: FiltersName) => {
    setFilters({ ...filters, [name]: !filters[name] });
  };

  const handleChangeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const generatedPassword = generatePassword(length, filters);
    setPassword(generatedPassword || '');
  };

  const handleCopyToClipboard = async () => {
    try {
      await copyTextToClipboard(password);
    } catch (error: any) {
      console.error(`Error copying text to clipboard: ${error.message}`);
    }
  };

  return (
    <Container handleSubmit={handleSubmit}>
      <section className="container-password">
        <span className="password">{password}</span>
        <span className="icon">
          <FiClipboard onClick={handleCopyToClipboard} size={18} />
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
          name={FiltersName.lowercase}
          label="Incluir letras minúsculas"
          checked={filters[FiltersName.lowercase]}
          handleChange={handleCheckboxChange}
        />
        <Checkbox
          name={FiltersName.uppercase}
          label="Incluir letras maiúsculas"
          checked={filters[FiltersName.uppercase]}
          handleChange={handleCheckboxChange}
        />
        <Checkbox
          name={FiltersName.numbers}
          label="Incluir números"
          checked={filters[FiltersName.numbers]}
          handleChange={handleCheckboxChange}
        />
        <Checkbox
          name={FiltersName.symbols}
          label="Incluir caracteres especiais"
          checked={filters[FiltersName.symbols]}
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
