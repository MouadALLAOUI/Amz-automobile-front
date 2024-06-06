import { Button, Snackbar } from '@mui/joy';

export default function Validate({
  open = false,
  setOpen = () => {},
  handleCancel = () => {},
  vertical = 'top',
  horizontal = 'center',
}) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => setOpen(false)}
        key={vertical + horizontal}
        // autoHideDuration={5000}
        color="warning"
        size="lg"
        variant="outlined"
        sx={{ minWidth: 500 }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            width: '100%',
            height: '100%',
          }}
        >
          <h1 style={{ width: '100%', textAlign: 'center' }}>Warning</h1>
          <h4 style={{ width: '100%', textAlign: 'center' }}>
            are you sure you want to continue?
          </h4>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              width: '100%',
              height: '100%',
            }}
          >
            <Button
              variant="soft"
              color="primary"
              onClick={() => setOpen(false)}
              sx={{ flexGrow: 1 }}
            >
              No
            </Button>
            <Button
              variant="soft"
              color="danger"
              onClick={() => {
                setOpen(false);
                handleCancel();
              }}
              sx={{ flexGrow: 1 }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Snackbar>
    </div>
  );
}
