import AddTaskComponent from '../../../../component/addtask/AddTaskComponent';
export default function AddTaskMethodes({
  openAddTask = false,
  setOpenAddTask = () => {},
  setOpenLoader = () => {},
  setOpenError = () => {},
  setError = () => {},
}) {
  return (
    <>
      <AddTaskComponent
        setOpenLoader={setOpenLoader}
        open={openAddTask}
        setOpen={setOpenAddTask}
        setOpenError={setOpenError}
        setError={setError}
        handleCancel={() => setOpenAddTask(false)}
      />
    </>
  );
}
