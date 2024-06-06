import { Option, Select } from '@mui/joy';

export default function CustomSelect({
  id = '',
  value = '',
  name = '',
  placeholder = '',
  onChange = () => {},
  options = ['Test'],
}) {
  return (
    <Select
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {options.map((value, index) => {
        return (
          <Option value={value} key={index}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
}
