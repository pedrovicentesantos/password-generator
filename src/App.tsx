import { useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import { Snackbar } from '@material-ui/core';
import { Container, Checkbox } from './components';
import { copyTextToClipboard } from './helpers/copyToClipboard';
import { generatePassword } from './helpers/generatePassword';
import { FiltersName, FiltersType } from './types';

const defaultLength = 8;

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState<number | string>(defaultLength);
  const [filters, setFilters] = useState<FiltersType>({
    [FiltersName.lowercase]: true,
    [FiltersName.uppercase]: true,
    [FiltersName.numbers]: true,
    [FiltersName.symbols]: true
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCheckboxChange = (name: FiltersName) => {
    setFilters({ ...filters, [name]: !filters[name] });
  };

  const handleChangeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.target.value, 10) || '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const generatedPassword = generatePassword(length as number, filters);
    setPassword(generatedPassword || '');
  };

  const handleCopyToClipboard = async () => {
    try {
      await copyTextToClipboard(password);
      setShowSnackbar(true);
    } catch (error: any) {
      console.error(`Error copying text to clipboard: ${error.message}`);
    }
  };

  return (
    <Container handleSubmit={handleSubmit}>
      <section className="container-password">
        <span className="password">{password}</span>
        <span className="icon">
          <FiClipboard
            className="icon-clipboard"
            onClick={handleCopyToClipboard}
            size={18}
          />
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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        message="Senha copiada para área de transferência!"
      />
    </Container>
  );
};

export default App;
