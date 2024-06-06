import {
  Modal,
  ModalDialog,
  DialogContent,
} from '@mui/joy';
import SettingContent from './settingContent';
export default function SettingModal({ open = false, setOpen = () => {}, onDecconect= () => {} }) {
  return (
    <Modal className="setting-Modal" open={open} onClose={() => setOpen()}>
      <ModalDialog className="setting-Modal-Dialog" aria-labelledby="setting" aria-describedby="setting">
        <DialogContent className="setting-Modal-Content">
          <SettingContent onClose={() => setOpen(!open)} onDecconect= {onDecconect}  />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
