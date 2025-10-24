// /* eslint-disable */
import { useState } from 'react';
import {
  Modal,
  ModalDialog,
  DialogContent,
  // Switch,
  AccordionGroup,
  Accordion,
  AccordionSummary,
  Avatar,
  ListItemContent,
  AccordionDetails,
  // FormControl,
  // FormLabel,
  RadioGroup,
  Radio,
  Button,
} from '@mui/joy';

export default function EditTask(props) {
  const {
    open = false, // Default to false, controlled by parent
    setOpen = () => { },
    rowSetting = { id: 0, state: 'pending' },
    setRowSetting = () => { },
    onOpenFullEdit = () => { }, // Callback to open the full edit component
    ontaskChangeClick = () => { },
  } = props;
  const [index, setIndex] = useState(1); // Default to showing status first
  const stateList = ['pending', 'in_progress', 'completed'];

  // Function to handle opening the full edit modal
  const handleOpenFullEdit = () => {
    onOpenFullEdit(rowSetting.id); // Pass the task ID back to the parent
    setOpen(false); // Close this modal
  };

  return (
    <Modal className="edit-task-Modal" open={open} onClose={() => setOpen(false)}>
      <ModalDialog className="edit-task-Modal-Dialog">
        <DialogContent className="edit-task-Modal-Content">
          <div className="edit-task-content">
            <h3 className="edit-task-content-title">Edit Options for Task {`${rowSetting.id}`} </h3>
            <div className="edit-task-content-list">
              <AccordionGroup transition="0.2s">
                <Accordion
                  expanded={index === 1}
                  onChange={() => setIndex(index === 1 ? null : 1)} // Allow collapsing
                >
                  <AccordionSummary>
                    <Avatar color="primary">
                      <i className="fad fa-tasks-alt"></i>
                    </Avatar>

                    <ListItemContent>
                      <h4>Task Status</h4>
                      <h6>Change the task status</h6>
                    </ListItemContent>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RadioGroup
                      orientation="horizontal"
                      name="status"
                      value={rowSetting.state}
                      onChange={(event) =>
                        setRowSetting({ ...rowSetting, state: event.target.value })
                      }
                      sx={{
                        my: 1, // Reduced margin
                        minHeight: 48,
                        padding: '4px',
                        borderRadius: '12px',
                        bgcolor: '#DDDDDD80',
                        '--RadioGroup-gap': '4px',
                        '--Radio-actionRadius': '8px',
                      }}
                    >
                      <span style={{ padding: '0 10px', display: 'flex', alignItems: 'center' }}>State:</span>
                      {stateList.map((item) => (
                        <Radio
                          key={item}
                          color="neutral"
                          value={item}
                          disableIcon
                          label={{
                            'pending': <><i className="fas fa-battery-empty" style={{ marginRight: '5px' }}></i> pending</>,
                            'in_progress': <><i className="fas fa-battery-bolt" style={{ marginRight: '5px' }}></i> in progress</>,
                            'completed': <><i className="fas fa-battery-full" style={{ marginRight: '5px' }}></i> completed</>
                          }[item]}
                          variant="plain"
                          sx={{ px: 2, alignItems: 'center' }}
                          slotProps={{
                            action: ({ checked }) => ({
                              sx: {
                                ...(checked && {
                                  bgcolor: {
                                    'pending': '#DDE7EE',
                                    'in_progress': '#FFECB3', // Lighter yellow
                                    'completed': '#C8E6C9' // Lighter green
                                  }[item],
                                  boxShadow: 'sm',
                                  color: {
                                    'pending': '#0B6BCB',
                                    'in_progress': '#E65100',
                                    'completed': '#1B5E20'
                                  }[item],
                                  fontWeight: 'bold',
                                }),
                              },
                            }),
                          }}
                        />
                      ))}
                    </RadioGroup>
                    <Button
                      onClick={() => ontaskChangeClick(rowSetting)} // Use the passed rowSetting state
                      className="button-config-btn"
                      size="sm" // Smaller button
                      sx={{ mt: 1 }} // Reduced margin
                    >
                      Save Status
                    </Button>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={index === 2}
                  onChange={() => setIndex(index === 2 ? null : 2)} // Allow collapsing
                >
                  <AccordionSummary>
                    <Avatar color="primary">
                      <i className="fad fa-edit"></i> {/* Changed icon */}
                    </Avatar>

                    <ListItemContent>
                      <h4>Edit Task Details</h4>
                      <h6>Edit client, vehicle, and task information</h6>
                    </ListItemContent>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Button
                      onClick={handleOpenFullEdit} // Call the handler to open the full edit modal
                      className="button-config-btn"
                      size="sm" // Smaller button
                      sx={{ mt: 1 }} // Reduced margin
                    // disabled // Removed disabled attribute
                    >
                      Edit Full Task Details
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

