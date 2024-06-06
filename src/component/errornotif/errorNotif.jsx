import { Button, Snackbar } from '@mui/joy';

const ErrorNotif = ({
  open = false,
  setOpen = () => {},
  error = null,
  vertical = 'top',
  horizontal = 'center',
}) => {
  const isErrorEmpty = Object.keys(error).length === 0;
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={(event, reason) =>
          reason === 'timeout' ? setOpen(false) : () => {}
        }
        key={vertical + horizontal}
        autoHideDuration={3000}
        color="danger"
        size="lg"
        variant="solid"
        sx={{ minWidth: 500 }}
        startDecorator={
          <i
            className="fa-solid fa-brake-warning"
            style={{ color: '#FFF', fontSize: 24, p: 10 }}
          ></i>
        }
        endDecorator={
          <Button
            onClick={() => setOpen(false)}
            variant="plain"
            sx={{ color: '#FFF', fontSize: 24, p: 0, m: 0 }}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        }
      >
        {isErrorEmpty && <h1>No Error</h1>}
        <ul style={{ padding: '0 20px' }}>
          {!isErrorEmpty &&
            Object.entries(error).map(
              ([key, messages]) =>
                Array.isArray(messages) &&
                messages.map((message, index) => (
                  <li key={`${key}-${index}`}>
                    {key}: {message}
                  </li>
                ))
            )}
        </ul>
      </Snackbar>
    </div>
  );
};

export default ErrorNotif;
