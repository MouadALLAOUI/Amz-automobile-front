import { Modal, ModalDialog } from '@mui/joy';
import { PDFViewer } from '@react-pdf/renderer';
import Content from './content';

export default function PDF_GENERATOR_CONTAINER({
  open = false,
  setOpen = () => {},
}) {
  return (
    <Modal className="Modal-pdf" open={open} onClose={setOpen}>
      <ModalDialog className="Modal-pdf-Dialog">
        <div className="Modal-pdf-Dialog-Content">
          <PDFViewer style={{ flexGrow: 1, height: '70vh' }}>
            <Content />
          </PDFViewer>
        </div>
      </ModalDialog>
    </Modal>
  );
}
