function NavLinkBtn({
  IsIco = true,
  IcoType = 'class',
  Ico = 'fa-solid fa-rv',
  text = 'Home',
  id = 'input',
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
    <div className="navlink-container">
      {IsIco && (
        <div className="Icon-container IconC">
          {getIconByType(IcoType, Ico)}
        </div>
      )}
      {text !== '' && (
        <div className="navlink-dev">
          <span id={id} className="navlink-title">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

export default NavLinkBtn;
