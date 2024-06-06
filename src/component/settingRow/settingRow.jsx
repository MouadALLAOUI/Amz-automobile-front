import { useState } from 'react';
import {
  Modal,
  ModalDialog,
  DialogContent,
  Switch,
  AccordionGroup,
  Accordion,
  AccordionSummary,
  Avatar,
  ListItemContent,
  AccordionDetails,
  FormControl,
  FormLabel,
} from '@mui/joy';

export default function SettingRowTable({
  settings = {},
  handleToggle = () => {},
  open = true,
  setOpen = () => {},
}) {
  const [index, setIndex] = useState(0);
  return (
    <Modal className="setting-Modal" open={open} onClose={() => setOpen(false)}>
      <ModalDialog className="setting-Modal-Dialog">
        <DialogContent className="setting-Modal-Content">
          <div className="setting-content">
            <h3 className="setting-content-title">SETTING TABLE</h3>
            <div className="setting-content-list">
              {Object.entries(settings).map(([label, setting]) => (
                <AccordionGroup transition="0.2s" key={label}>
                  <Accordion
                    expanded={index === label}
                    onChange={(e, exp) => {
                      setIndex(exp ? label : null);
                    }}
                  >
                    <AccordionSummary>
                      <Avatar color="primary">
                        <i
                          className={`fa-solid fa-${
                            label === 'client'
                              ? 'user'
                              : label === 'task'
                              ? 'tasks'
                              : label === 'vehicule'
                              ? 'car'
                              : ''
                          }`}
                        ></i>
                      </Avatar>
                      <ListItemContent>
                        <h4>{label.toUpperCase()}</h4>
                        <h6>active les column the tableau pour {label}</h6>
                      </ListItemContent>
                    </AccordionSummary>
                    {Object.entries(setting).map(([key, value]) => (
                      <AccordionDetails key={key}>
                        <FormControl
                          orientation="horizontal"
                          key={key}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px',
                          }}
                        >
                          <FormLabel>{key.toUpperCase()}</FormLabel>
                          <Switch
                            color={value ? 'success' : 'danger'}
                            variant="solid"
                            checked={value}
                            onChange={() => handleToggle(label, key)}
                          />
                        </FormControl>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                </AccordionGroup>
              ))}
            </div>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
