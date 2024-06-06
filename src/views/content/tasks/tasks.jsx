import { useEffect, useState } from 'react';
import My_Table from '../../../component/table/table';
import { Button, IconButton } from '@mui/joy';
import axios from 'axios';
import GET_ENV, {
  FILL_TABLES,
  SET_TABLES_SETTINGS,
} from '../../../env/environnement';
import Loader from '../../../component/loader/Loader';
import ErrorNotif from '../../../component/errornotif/errorNotif';
import AddTaskMethodes from './methode/addTask';
import FilterTask from './methode/filterTask';
import SettingTable from '../../../component/settingRow/settingRow';

export default function Tasks() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isCheckBoxTable, setIsCheckBoxTable] = useState(false);
  const [isActionColTable, setIsActionColTable] = useState(true);

  const [settingOpen, setIsSettingOpen] = useState(false);
  /*
  {
        "id": 1,
        "nom": "Ellie Walker",
        "email": "dave.jast@example.net",
        "telephone": "1-609-280-3949",
        "vehicule_id": 11,
        "task_id": 11,
        "created_at": "2024-06-03T13:52:17.000000Z",
        "updated_at": "2024-06-03T13:52:17.000000Z",
        "task": [
            {
                "id": 11,
                "title": "Animi voluptatibus odit quis eum natus asperiores perferendis.",
                "description": "Et a optio fuga consequatur consequatur dolorem dolore eos. Sequi expedita aut et saepe
                voluptate omnis. Harum ut facilis quis. Natus nostrum et illum explicabo earum qui et.",
                "status": "completed",
                "assigned_to": 46,
                "created_by": 47,
                "created_at": "2024-06-03T13:52:13.000000Z",
                "updated_at": "2024-06-03T13:52:13.000000Z"
            }
        ],
        "vehicule": [
            {
                "id": 11,
                "vehicule": "aut",
                "immatriculation": "ipsam",
                "kilometrage": 41535,
                "model": "asperiores",
                "created_at": "2024-06-03T13:52:12.000000Z",
                "updated_at": "2024-06-03T13:52:12.000000Z"
            }
        ]
    },
  */
  const [settings, setSettings] = useState({
    client: { nom: true, email: true, telephone: false },
    task: { title: true, status: true, description: false, assigned_to: false },
    vehicule: {
      immatriculation: true,
      vehicule: false,
      model: false,
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
  const [openAddTask, setOpenAddTask] = useState(true); // for opening the modal of adding a task
  // filter une tache modal
  const [openFilterTask, setOpenFilterTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [rows, setRows] = useState([]);
  const [headCells, setHeadCells] = useState([]);

  useEffect(() => {
    axios
      .get(`${GET_ENV().API_URL}/clients`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        setError({ error: ['we are not able to access server'] });
        setOpenError(true);
        setIsCheckBoxTable(false);
        setIsActionColTable(false);
        setHeadCells([
          {
            id: 'err',
            label: err.message,
            numeric: false,
            disablePadding: true,
          },
        ]);
        setRows([{ err: err.message }]);
      });
  }, [openLoader]);

  useEffect(() => {
    let wantedCells = SET_TABLES_SETTINGS(settings);
    if (tasks.length > 0) {
      const { newRows, newHeadCell } = FILL_TABLES(tasks, wantedCells);
      setRows(newRows);
      setHeadCells(newHeadCell);
    }
  }, [tasks, settings]);

  return (
    <div className="tasks-views">
      <SettingTable
        open={settingOpen}
        setOpen={setIsSettingOpen}
        settings={settings}
        handleToggle={handleToggle}
      />
      {openLoader && <Loader />}
      <ErrorNotif open={openError} setOpen={setOpenError} error={error} />
      <AddTaskMethodes
        setOpenLoader={setOpenLoader}
        setOpenError={setOpenError}
        setError={setError}
        openAddTask={openAddTask}
        setOpenAddTask={setOpenAddTask}
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
          selected={selected}
          page={page}
          rowsPerPage={rowsPerPage}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          setSelected={setSelected}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </div>
  );
}
