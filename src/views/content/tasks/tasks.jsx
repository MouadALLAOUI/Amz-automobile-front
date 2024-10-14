import { useEffect, useState } from "react";
import My_Table from "../../../component/table/table";
import { Button, IconButton } from "@mui/joy";
import axios from "axios";
import GET_ENV, {
  FILL_TABLES,
  SET_TABLES_SETTINGS,
} from "../../../env/environnement";
import Loader from "../../../component/loader/Loader";
import ErrorNotif from "../../../component/errornotif/errorNotif";
import AddTaskComponent from "../../../component/addtask/AddTaskComponent";
import FilterTask from "./methode/filterTask";
import SettingTable from "../../../component/settingRow/settingRow";
import Swal from "sweetalert2";
import EditTask from "./methode/editTask";

export default function Tasks() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isCheckBoxTable, setIsCheckBoxTable] = useState(false);
  const [isActionColTable, setIsActionColTable] = useState(true);

  const [settingOpen, setIsSettingOpen] = useState(false);
  const [settings, setSettings] = useState({
    client: {
      client_name: true,
      client_email: false,
      client_telephone: false,
    },
    task: {
      task_id: true,
      task_title: true,
      task_status: true,
      task_description: false,
      assigned_to: false,
      created_by: false,
    },
    vehicule: {
      vehicules_immatriculation: true,
      vehicules_kilometrage: false,
      model_id: false,
      makes_id: false,
    },
  });

  const handleToggle = (field, key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: {
        ...prevSettings[field],
        [key]: !prevSettings[field][key],
      },
    }));
  };

  const [openLoader, setOpenLoader] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState({});

  // ajouter une tache modal
  const [openAddTask, setOpenAddTask] = useState(false); // for opening the modal of adding a task
  // filter une tache modal
  const [openFilterTask, setOpenFilterTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [rows, setRows] = useState([]);
  const [headCells, setHeadCells] = useState([]);

  useEffect(() => {
    axios
      .get(`${GET_ENV().API_URL}/vehicules`)
      .then((response) => {
        // console.log(response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        setError({ error: ["we are not able to access server"] });
        setOpenError(true);
        setIsCheckBoxTable(false);
        setIsActionColTable(false);
        setHeadCells([
          {
            id: "err",
            label: err.message,
            numeric: false,
            disablePadding: true,
          },
        ]);
        setRows([{ err: err.message }]);
      });
  }, [openLoader, error]);

  useEffect(() => {
    let wantedCells = SET_TABLES_SETTINGS(settings);
    if (tasks.length > 0) {
      const { newRows, newHeadCell } = FILL_TABLES(tasks, wantedCells);
      setRows(newRows);
      setHeadCells(newHeadCell);
    }
  }, [tasks, settings]);

  // const handleDelete = async (rowId) => {
  //   const url = `${GET_ENV().API_URL}/vehicules/${rowId}`;
  //   const response = await axios.delete(url);
  //   Swal.fire({
  //     title: 'you sure want to delete this task!',
  //     titleText: 'titleText',
  //     text: `Deleting row with id: ${rowId}`,
  //     icon: 'question',
  //     showDenyButton: true,
  //     denyButtonText: 'No, I regret',
  //     confirmButtonText: 'yes, sure',
  //   }).then((result) => {
  //     try {
  //       if (result.isConfirmed) {
  //         // open the loading page (a spining red circle)
  //         setOpenLoader(true);
  //         // the back-end api link
  //         if (response.data.status === 'success') {
  //           setOpenLoader(false);  // Hide loader on success
  //         } else {
  //           setOpenLoader(false);  // Hide loader if error occurs
  //           setError(response.data.error); // set error to error message from server
  //           setOpenError(true);    // Open the error modal
  //         }
  //       }
  //     } catch {
  //       setOpenLoader(false);
  //       setError('Une erreur est survenue lors de l\'envoi des données');
  //     }
  //     // axios.delete(url).then((response) => {
  //     //   Swal.fire({
  //     //     title: 'Data deleted successfully',
  //     //     text: `${response}`,
  //     //     icon: 'success',
  //     //     confirmButtonText: 'leave'
  //     //   });
  //     // }).catch((response) => {
  //     //   setError({ error: response.data.error });
  //     //   setOpenError(true);
  //     // );
  //     // }
  //   });
  // };

  const handleDelete = async (rowId) => {
    // Show the confirmation dialog first
    Swal.fire({
      title: "Are you sure you want to delete this task?",
      text: `Deleting row with ID: ${rowId}`,
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No, I regret",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      // Only proceed if user confirms
      if (result.isConfirmed) {
        try {
          // Open the loading indicator
          setOpenLoader(true);

          // Perform the delete API request
          const url = `${GET_ENV().API_URL}/vehicules/${rowId}`;
          const response = await axios.delete(url);

          // Check if the API response was successful
          if (response.data.status === "success") {
            // Hide the loader and show success message
            setOpenLoader(false);
            Swal.fire(
              "Deleted!",
              `Row with ID: ${rowId} was successfully deleted.`,
              "success"
            );
          } else {
            // Hide the loader and show an error message if deletion fails
            setOpenLoader(false);
            setError("Error occurred during deletion.");
            setOpenError(true);
          }
        } catch (error) {
          // Handle any errors during the API call
          setOpenLoader(false);
          setError("An error occurred while deleting the task.");
          setOpenError(true);
        }
      } else {
        // User denied deletion, do nothing
        Swal.fire("Cancelled", "The task was not deleted", "info");
      }
    });
  };
  const [editOpen, setEditOpen] = useState(false);
  const [rowSetting, setRowSetting] = useState({ id: 0, state: "pending" });

  const handleEdit = (rowId, task_status) => {
    setEditOpen(true);
    setRowSetting({ ...rowSetting, id: rowId, state: task_status });
    // Swal.fire({
    //   title: 'you sure want to edit this task!',
    //   text: `EDITING row with id: ${rowId}`,
    //   icon: 'info',
    //   confirmButtonText: 'Cool'
    // });
  };

  return (
    <div className="tasks-views">
      <SettingTable
        open={settingOpen}
        setOpen={setIsSettingOpen}
        settings={settings}
        handleToggle={handleToggle}
      />
      <EditTask
        open={editOpen}
        setOpen={setEditOpen}
        rowSetting={rowSetting}
        setRowSetting={setRowSetting}
      />
      {openLoader && <Loader />}
      <ErrorNotif open={openError} setOpen={setOpenError} error={error} />
      <AddTaskComponent
        setOpenLoader={setOpenLoader}
        open={openAddTask}
        setOpen={setOpenAddTask}
        setOpenError={setOpenError}
        setError={setError}
        handleCancel={() => setOpenAddTask(false)}
      />
      <FilterTask open={openFilterTask} setOpen={setOpenFilterTask} />
      <div className="option-tasks">
        <div className="button-config">
          <Button
            onClick={() => setOpenAddTask(true)}
            className="button-config-btn"
          >
            Ajoute une tache
          </Button>
        </div>
        <div className="icons-group">
          <IconButton
            disabled={false}
            variant="plain"
            onClick={() => setOpenFilterTask(true)}
          >
            <i className="fa-solid fa-screwdriver-wrench"></i>
          </IconButton>
          <IconButton
            disabled={false}
            variant="plain"
            onClick={() => setIsSettingOpen(true)}
          >
            <i className="fa-solid fa-gear"></i>
          </IconButton>
        </div>
      </div>
      <div className="option-tasks">
        <My_Table
          isCheckBox={isCheckBoxTable}
          isAction={isActionColTable}
          rows={rows}
          headCells={headCells}
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          onDeleteClick={handleDelete}
          onEditClick={handleEdit}
        />
      </div>
    </div>
  );
}
