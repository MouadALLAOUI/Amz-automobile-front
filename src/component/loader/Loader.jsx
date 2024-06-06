import CircularProgress from '@mui/joy/CircularProgress';

const Loader = () => {
  return (
    <div className='Loader'>
      <CircularProgress
        color="danger"
        size="lg"
        value={10}
        variant="solid"
      />
    </div>
  );
};

export default Loader;
