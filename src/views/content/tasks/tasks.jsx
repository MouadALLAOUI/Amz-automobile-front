/* eslint-disable */
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
// import FilterTask from "./methode/filterTask";
import SettingTable from "../../../component/settingRow/settingRow";
import Swal from "sweetalert2";
import EditTask from "./methode/editTask";
import EditTaskComponent from "../../../component/editTask/EditTaskComponent";

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
      model: true,
      makes: true,
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

  // Add Task Modal state
  const [openAddTask, setOpenAddTask] = useState(false);

  // Edit Task Status/Options Modal state
  const [editStatusOpen, setEditStatusOpen] = useState(false);
  const [rowSetting, setRowSetting] = useState({ id: null, state: "pending" });

  // Edit Full Task Details Modal state
  const [editFullTaskOpen, setEditFullTaskOpen] = useState(false);
  // const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [rows, setRows] = useState([]);
  const [headCells, setHeadCells] = useState([]);

  // Fetch tasks function
  const fetchTasks = () => {
    axios
      .get(`${GET_ENV().API_URL}/vehicules`) // Assuming /vehicules endpoint returns tasks/vehicles
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        setError({ error: ["Failed to access server or fetch tasks."] });
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
  };

  // Initial fetch and refetch on loader close or error change
  useEffect(() => {
    fetchTasks();
  }, [openLoader, error]); // Refetch when loader closes (implies action completed) or error state changes

  // Update table rows/headers when tasks or settings change
  useEffect(() => {
    let wantedCells = SET_TABLES_SETTINGS(settings);
    if (tasks.length > 0) {
      const { newRows, newHeadCell } = FILL_TABLES(tasks, wantedCells);
      setRows(newRows);
      setHeadCells(newHeadCell);
    } else {
      // Handle empty tasks state after fetch or filtering
      setRows([]);
      // Optionally keep headers or set specific empty state headers
    }
  }, [tasks, settings]);

  const handleDelete = async (rowId) => {
    Swal.fire({
      title: "Are you sure you want to delete this task?",
      text: `Deleting row with ID: ${rowId}`,
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No, I regret",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpenLoader(true);
        try {
          const url = `${GET_ENV().API_URL}/vehicules/${rowId}`;
          const response = await axios.delete(url);
          setOpenLoader(false);
          if (response.data.status === "success") {
            Swal.fire(
              "Deleted!",
              `Row with ID: ${rowId} was successfully deleted.`,
              "success"
            );
            fetchTasks(); // Refetch tasks after successful deletion
          } else {
            setError({ error: [response.data.error || "Error occurred during deletion."] });
            setOpenError(true);
          }
        } catch (error) {
          setOpenLoader(false);
          setError({ error: [error.message || "An error occurred while deleting the task."] });
          setOpenError(true);
        }
      } else {
        Swal.fire("Cancelled", "The task was not deleted", "info");
      }
    });
  };

  // Opens the initial Edit modal (for status or full edit option)
  const handleEdit = (rowId, task_status) => {
    setRowSetting({ id: rowId, state: task_status || "pending" });
    setEditStatusOpen(true);
  };

  // Handles opening the full edit component from the EditTask modal
  const handleOpenFullEdit = (taskId) => {
    setEditingTaskId(taskId);
    setEditFullTaskOpen(true);
    setEditStatusOpen(false); // Close the status/options modal
  };

  // Handles changing only the task status
  const handleTaskStatusChange = (setting) => {
    Swal.fire({
      title: "Are you sure you want to edit this task status?",
      text: `Updating status to: ${setting.state}`,
      icon: "question",
      showDenyButton: true,
      denyButtonText: "No, keep it",
      confirmButtonText: "Yes, change it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpenLoader(true);
        try {
          const url = `${GET_ENV().API_URL}/taskstatus`; // Endpoint for status update
          const data = {
            id: setting.id,
            task_status: setting.state,
          };
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const response = await axios.put(url, data, config);
          setOpenLoader(false);
          if (response.data.status === "success") {
            Swal.fire(
              "Changed!",
              `Row status with ID: ${setting.id} was successfully changed.`,
              "success"
            );
            setEditStatusOpen(false); // Close the modal after success
            fetchTasks(); // Refetch tasks to show updated status
          } else {
            setError({ error: [response.data.error || "Error occurred during status update."] });
            setOpenError(true);
          }
        } catch (error) {
          setOpenLoader(false);
          setError({ error: [error.message || "An error occurred while editing the task status."] });
          setOpenError(true);
        }
      } else {
        Swal.fire("Cancelled", "The task status was not changed", "info");
      }
    });
  };

  return (
    <div className="tasks-views">
      {/* Settings Modal */}
      <SettingTable
        open={settingOpen}
        setOpen={setIsSettingOpen}
        settings={settings}
        handleToggle={handleToggle}
      />

      {/* Edit Status/Options Modal */}
      <EditTask
        open={editStatusOpen}
        setOpen={setEditStatusOpen}
        rowSetting={rowSetting} // Pass current row id and state
        setRowSetting={setRowSetting} // Allow EditTask to update local state if needed before save
        onOpenFullEdit={handleOpenFullEdit} // Pass handler to open full edit modal
        ontaskChangeClick={handleTaskStatusChange} // Pass handler for saving status change
      />

      {/* Full Edit Task Modal */}
      {editingTaskId && (
        <EditTaskComponent
          taskid={editingTaskId} // Pass the ID of the task to edit
          open={editFullTaskOpen}
          setOpen={setEditFullTaskOpen} // Allow component to close itself
          setOpenLoader={setOpenLoader}
          setOpenError={setOpenError}
          setError={setError}
          onSuccessfulEdit={() => {
            setEditFullTaskOpen(false);
            fetchTasks(); // Refetch tasks after successful edit
          }}
          handleCancel={() => setEditFullTaskOpen(false)} // Simple cancel closes modal
        />
      )}

      {/* Loader and Error Notifications */}
      {openLoader && <Loader />}
      <ErrorNotif open={openError} setOpen={setOpenError} error={error} />

      {/* Add Task Modal */}
      <AddTaskComponent
        setOpenLoader={setOpenLoader}
        open={openAddTask}
        setOpen={setOpenAddTask}
        setOpenError={setOpenError}
        setError={setError}
        onSuccessfulAdd={() => {
          setOpenAddTask(false);
          fetchTasks(); // Refetch tasks after successful add
        }}
        handleCancel={() => setOpenAddTask(false)}
      />

      {/* Filter Task Modal (Commented out) */}
      {/* <FilterTask open={openFilterTask} setOpen={setOpenFilterTask} /> */}

      {/* Action Buttons */}
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
          {/* Filter Button (Commented out) */}
          {/* <IconButton variant="plain" onClick={() => setOpenFilterTask(true)}><i className="fa-solid fa-screwdriver-wrench"></i></IconButton> */}
          <IconButton
            variant="plain"
            onClick={() => setIsSettingOpen(true)}
          >
            <i className="fa-solid fa-gear"></i>
          </IconButton>
        </div>
      </div>

      {/* Task Table */}
      <div className="table-container"> {/* Added a container for potential styling */}
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
          onEditClick={handleEdit} // This opens the EditTask (status/options) modal
        />
      </div>
    </div>
  );
}

