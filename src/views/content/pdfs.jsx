import { useState } from 'react';
import My_Table from '../../component/table/table';
import { Button, IconButton } from '@mui/joy';
import PDF_GENERATOR_CONTAINER from '../../component/pdf/pdf-view';

export default function PrintPdf() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pdfViewOpen, setPdfViewOpen] = useState(false);

  const rows = [
    { name: 'task1', name2: 1 },
    { name: 'task2', name2: 1 },
    { name: 'task3', name2: 1 },
  ];
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'name2',
      numeric: true,
      disablePadding: true,
      label: 'number',
    },
  ];

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
          <IconButton disabled={false} variant="plain" onClick={setPdfViewOpen}>
            <i className="fa-solid fa-file-pdf"></i>
          </IconButton>
        </div>
      </div>
      <div className="option-pdfs">
        <PDF_GENERATOR_CONTAINER
          open={pdfViewOpen}
          setOpen={() => setPdfViewOpen(false)}
        />
        <My_Table
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
