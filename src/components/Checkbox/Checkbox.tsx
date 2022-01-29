import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { FiltersName } from '../../types';

type CheckboxProps = {
  name: FiltersName;
  label: string;
  checked: boolean;
  handleChange: (name: FiltersName) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  handleChange
}) => (
  <div className="checkbox-wrapper">
    <label>{label}</label>
    {checked ? (
      <FiCheckCircle onClick={() => handleChange(name)} size={18} />
    ) : (
      <FiCircle onClick={() => handleChange(name)} size={18} />
    )}
  </div>
);

export { Checkbox };
