/* eslint-disable */
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
  RadioGroup,
  Radio,
  Button,
} from '@mui/joy';

export default function EditTask(props) {
  const {
    open = true,
    setOpen = () => {},
    rowSetting = { id: 0, state: 'pending' },
    setRowSetting = () => {},
    openEditTask = false,
    setOpenEditTask = () => {},
  } = props;
  const [index, setIndex] = useState(2);
  const stateList = ['pending', 'in_progress', 'completed'];
  return (
    <Modal className="edit-task-Modal" open={open} onClose={() => setOpen(false)}>
      <ModalDialog className="edit-task-Modal-Dialog">
        <DialogContent className="edit-task-Modal-Content">
          <div className="edit-task-content">
            <h3 className="edit-task-content-title">Edit Row {`${rowSetting.id}`} </h3>
            <div className="edit-task-content-list">
              <AccordionGroup transition="0.2s">
                <Accordion
                  expanded={index === 1}
                  onChange={() => setIndex(index === 1 ? 2 : 1)}
                >
                  <AccordionSummary>
                    <Avatar color="primary">
                      <i className="fad fa-tasks-alt"></i>
                    </Avatar>

                    <ListItemContent>
                      <h4>task Status</h4>
                      <h6>change the task status</h6>
                    </ListItemContent>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RadioGroup
                      orientation="horizontal"
                      name="status"
                      value={rowSetting.state}
                      onChange={(event) =>
                        setRowSetting({...rowSetting, state: event.target.value })
                      }
                      sx={{
                        my: 2,
                        minHeight: 48,
                        padding: '4px',
                        borderRadius: '12px',
                        bgcolor: '#DDDDDD80',
                        '--RadioGroup-gap': '4px',
                        '--Radio-actionRadius': '8px',
                      }}
                    >
                      <span style={{ padding: 10, alignItems: 'center' }}>state :</span>
                      {stateList.map((item) => (
                        <Radio
                          key={item}
                          color="neutral"
                          value={item}
                          disableIcon
                          label={{
                            'pending': <><i className="fas fa-battery-empty"></i> pending</>,
                            'in_progress': <><i className="fas fa-battery-bolt"></i> in_progress</>,
                            'completed': <><i className="fas fa-battery-full"></i> completed</>
                          }[item]}
                          variant="plain"
                          sx={{ px: 2, alignItems: 'center' }}
                          slotProps={{
                            action: ({ checked }) => ({
                              sx: {
                                ...(checked && {
                                  bgcolor: {
                                    'pending': '#DDE7EE',
                                    'in_progress': '#FFC107',
                                    'completed': '#28A745'
                                  }[item],
                                  boxShadow: 'sm',
                                }),
                              },
                            }),
                          }}
                        />
                      ))}
                    </RadioGroup>
                    <Button
                      onClick={() => setOpenEditTask(true)}
                      className="button-config-btn"
                      sx={{ my: 2 }}
                    >
                      save state
                    </Button>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={index === 2}
                  onChange={() => setIndex(2)}
                >
                  <AccordionSummary>
                    <Avatar color="primary">
                      <i className="fad fa-tasks-alt"></i>
                    </Avatar>

                    <ListItemContent>
                      <h4>task edit</h4>
                      <h6>edit the task data</h6>
                    </ListItemContent>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Button
                      onClick={() => setOpenEditTask(true)}
                      className="button-config-btn"
                      sx={{ my: 2 }}
                      disabled
                    >
                      modifier une tache (working on it)
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </div>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
