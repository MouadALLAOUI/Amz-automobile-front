function Input({
  IsBIco = false,
  BIcoType = 'class',
  BIco = 'fa-solid fa-abacus',
  moreAttr = {},
  id = 'input',
  type = 'text',
  name = '',
  isErr= false,
  placeholder = '',
  className = 'Input',
  disabled = false,
  required = false,
  onChange = () => {},
  IsAIco = false,
  AIcoType = 'class',
  AIco = 'fa-solid fa-abacus',
}) {
  const getIconByType = (type, Icon) => {
    switch (type) {
    case 'image':
      return <img className="Icon" src={Icon} alt="icon" />;
    case 'svg':
      return <Icon className="Icon" />;
    default:
      return <i height={30} className={`Icon ${Icon}`}></i>;
    }
  };
  return (
    <div className={`input-container ${isErr && 'error'}`}>
      {IsBIco && (
        <label htmlFor={id} className="Icon-container BIcon">
          {getIconByType(BIcoType, BIco)}
        </label>
      )}
      <div className="input-dev">
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`input ${isErr && 'error'} ${className}`}
          disabled={disabled}
          onChange={onChange}
          required={required}
          {...moreAttr}
        />
      </div>
      {IsAIco && (
        <label htmlFor={id} className="Icon-container AIcon">
          {getIconByType(AIcoType, AIco)}
        </label>
      )}
    </div>
  );
}

export default Input;
