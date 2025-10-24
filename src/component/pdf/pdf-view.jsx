import { Modal, ModalDialog } from '@mui/joy';
import { PDFViewer, Document } from '@react-pdf/renderer';
import Content from './content';
import { useEffect, useState } from 'react';

export default function PDF_GENERATOR_CONTAINER({
  open = false,
  vehicules = [],
  selected = [],
  setOpen = () => { },
}) {
  const [vehicule, setvehicule] = useState([]);
  // const [page, setPage] = useState(1);
  useEffect(() => {
    const updatedVehicules = vehicules.filter((vehicule) =>
      selected.includes(vehicule.id)
    );

    setvehicule(updatedVehicules);
  }, [selected, vehicules]);

  return (
    <Modal className="Modal-pdf" open={open} onClose={setOpen}>
      <ModalDialog className="Modal-pdf-Dialog">
        <div className="Modal-pdf-Dialog-Content">
          <PDFViewer style={{ flexGrow: 1, height: '70vh' }}>
            <Document>
              {vehicule.length === 0 ? <Content /> : vehicule.map((value, key) => {
                return (
                  <Content key={key} vehicule={value} />
                );
              })}
            </Document>
          </PDFViewer>
        </div>
      </ModalDialog>
    </Modal>
  );
}
