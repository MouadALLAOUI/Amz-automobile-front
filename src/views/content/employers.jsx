import { useEffect, useState } from 'react';
import My_Table from '../../component/table/table';
import { Button, IconButton } from '@mui/joy';
import axios from 'axios';
import GET_ENV, { FILL_TABLES } from '../../env/environnement';

export default function Employers() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [headCells, setHeadCells] = useState([]);
  const [actionCol, setActionCol] = useState(true);

  const wantedHeadCells = ['id', 'nom', 'prenom', 'email', 'userRole'];

  useEffect(() => {
    axios
      .get(`${GET_ENV().API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        setActionCol(false);
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
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const { newRows, newHeadCell } = FILL_TABLES(users, wantedHeadCells);
      setRows(newRows);
      setHeadCells(newHeadCell);
    }
  }, [users]);

  return (
    <div className="Pdfs-views">
      <div className="option-pdfs">
        <div className="button-config">
          <Button
            color="neutral"
            onClick={function () {}}
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
        </div>
      </div>
      <div className="option-pdfs">
        <My_Table
          isCheckBox={false}
          isAction={actionCol}
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
