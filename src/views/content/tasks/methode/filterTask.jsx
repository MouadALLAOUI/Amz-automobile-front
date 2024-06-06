import TaskFilterComponent from '../../../../component/filter/filtertasks';
export default function FilterTask({ open = true, setOpen = () => {} }) {
  return (
    <div>
      <TaskFilterComponent
        handleApply={() => {}}
        handleCancel={() => setOpen(false)}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
