import { useEffect, useState } from 'react';
import My_Table from '../../../component/table/table';
import { Button, IconButton } from '@mui/joy';
import PDF_GENERATOR_CONTAINER from '../../../component/pdf/pdf-view';
import axios from 'axios';
import GET_ENV, { FILL_TABLES, SET_TABLES_SETTINGS } from '../../../env/environnement';
import Loader from '../../../component/loader/Loader';
import ErrorNotif from '../../../component/errornotif/errorNotif';
//! /* eslint-disable */
export default function PrintPdf() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isCheckBoxTable, setIsCheckBoxTable] = useState(true);
  const [isActionColTable, setIsActionColTable] = useState(true);

  const [pdfViewOpen, setPdfViewOpen] = useState(false);

  const openLoader = false;
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState({});

  const [tasksSheet, setTasksSheet] = useState([]);
  const [rows, setRows] = useState([]);
  const [headCells, setHeadCells] = useState([]);
  // {
  //   "id": 1,
  //   "entree": "2024-10-15 15:39:00",
  //   "sortie": null,
  //   "details": "TEST the car",
  //   "vehicule_id": 1,
  //   "task_id": "TASK-001",
  //   "vehicule": "Alhambra (Seat)",
  //   "immatriculation": "CAR-REF-2001",
  //   "kilometrage": "1500",
  //   "name": "MOUAD",
  //   "description": null,
  //   "tps": null,
  //   "operations_realisees": null,
  //   "observations": null
  // }
  const settings = {
    task_sheet: {
      vehicule: true,
      immatriculation: true,
      name: true,
      kilometrage: true,
      details: true,
      entree: true,
      sortie: true,
      description: false,
      tps: false,
      operations_realisees: false,
      observations: false,
      vehicule_id: false,
    }
  };

  /*
    // const row = [
    //   { id: 'task1', name2: 1, test: 2 },
    //   { id: 'task2', name2: 1, test: 2 },
    //   { id: 'task3', name2: 1, test: 2 },
    // ];
    // const headCell = [
    //   {
    //     id: 'id',
    //     numeric: false,
    //     disablePadding: true,
    //     label: 'Name',
    //   },
    //   {
    //     id: 'name2',
    //     numeric: true,
    //     disablePadding: true,
    //     label: 'number',
    //   },
    //   {
    //     id: 'test',
    //     numeric: true,
    //     disablePadding: true,
    //     label: 'number 2',
    //   },
    // ];
  */

  useEffect(() => {
    axios.get(`${GET_ENV().API_URL}/task-sheets`)
      .then((response) => {
        // console.log(response.data.tasksheet); // #f95
        // console.log(response.data.vehicule); // #f95
        setTasksSheet(response.data.tasksheet);
        // setVehicules(response.data.vehicule);
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
    if (tasksSheet.length > 0) {
      const { newRows, newHeadCell } = FILL_TABLES(tasksSheet, wantedCells);
      setRows(newRows);
      setHeadCells(newHeadCell);
    }
  }, [tasksSheet]);

  console.log(selected);

  return (
    <div className="Pdfs-views">
      {openLoader && <Loader />}
      <ErrorNotif open={openError} setOpen={setOpenError} error={error} />
      <div className="option-pdfs">
        <div className="button-config">
          <Button
            color="neutral"
            onClick={function () { }}
            size="lg"
            sx={{ bgcolor: '#000' }}
          >
            CONFIGURATION
          </Button>
        </div>
        <div className="icons-group">
          <IconButton disabled={false} variant="plain">
            <i className="fa-solid fa-screwdriver-wrench"></i>
          </IconButton>
          <IconButton disabled={false} variant="plain">
            <i className="fa-solid fa-gear"></i>
          </IconButton>
          <IconButton disabled={false} variant="plain" onClick={() => setPdfViewOpen(true)}>
            <i className="fa-solid fa-file-pdf"></i>
          </IconButton>
        </div>
      </div>
      <div className="option-pdfs">
        <PDF_GENERATOR_CONTAINER
          open={pdfViewOpen}
          setOpen={() => setPdfViewOpen(false)}
          vehicules={tasksSheet}
          selected={selected}
        />
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
          isDeleteBtn={false}
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
