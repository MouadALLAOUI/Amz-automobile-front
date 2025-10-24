/* eslint-disable */
import {
  Button,
  Modal,
  ModalDialog,
} from '@mui/joy';
import StepperTabs from './steper';
import Client1 from './steps/Client1';
import Vehicule from './steps/Vehicule2';
import Task3 from './steps/Task3';
import Done from './steps/done';
import Validate from '../errornotif/validate';
import { useEffect, useState } from 'react';
import GET_ENV from '../../env/environnement';
// import { useSelector } from 'react-redux'; // Removed unused import
// import { userSelector } from '../../store/userSlice'; // Removed unused import
import axios from 'axios';
import Swal from 'sweetalert2'; // Added Swal import

export default function EditTaskComponent(props) {
  const {
    taskid = null,
    setOpenLoader = () => { },
    handleCancel = () => { },
    open = false,
    setOpen = () => { },
    setOpenError = () => { },
    setError = () => { },
    onSuccessfulEdit = () => { }
  } = props;

  const [isLoadingTaskData, setIsLoadingTaskData] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const [formSettings, setFormSettings] = useState({
    isNextButton: false,
    stepsList: ['Client', 'Vehicule', 'task', 'done'],
    activeStep: 0,
  });

  /* Client.jsx state */
  const [client, setClient] = useState({
    isCheckForClient: false,
    nom: '',
    email: '',
    telephone: '',
  });

  /* Vehicule.jsx state */
  const [automobile, setAutomobile] = useState({
    immatriculation: '',
    kilometrage: '',
    vehicule: null,
    model: null
  });

  /* Task.jsx state */
  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    assigned_to: null,
  });

  // Fetch task data when the modal opens and taskid is valid
  useEffect(() => {
    if (open && taskid !== null) {
      setIsLoadingTaskData(true);
      setOpenLoader(true);
      axios
        .get(`${GET_ENV().API_URL}/vehicules/${taskid}`)
        .then((response) => {
          const fetchedData = response.data;
          if (fetchedData) {
            setClient({
              ...client,
              nom: fetchedData.client_name || '',
              email: fetchedData.client_email || '',
              telephone: fetchedData.client_telephone || '',
            });

            axios
              .get(`${GET_ENV().API_URL}/car-makes/${fetchedData.makes_id}`)
              .then((response) => {
                const vehic = response.data;
                const model = vehic.models;

                const selectedModel = model.find((item) => item.id == fetchedData.model_id);

                setAutomobile({
                  ...automobile,
                  immatriculation: fetchedData.vehicules_immatriculation || '',
                  kilometrage: fetchedData.vehicules_kilometrage || '',
                  vehicule: vehic || null,
                  model: selectedModel || null
                });
              })
              .catch((err) => {
                console.log(err);
              });

            axios
              .get(`${GET_ENV().API_URL}/users/${fetchedData.assigned_to}`)
              .then((response) => {
                setTask({
                  ...task,
                  id: fetchedData.task_id || '', // Assuming task_id is the field name
                  title: fetchedData.task_title || '',
                  description: fetchedData.task_description || '',
                  assigned_to: response.data || null,
                });
              })
              .catch((err) => {
                console.log(err);
              });

            // Reset stepper to first step
            setFormSettings(prev => ({ ...prev, activeStep: 0, isNextButton: false }));
          } else {
            setError({ error: ['Task data not found or invalid format.'] });
            setOpenError(true);
            setOpen(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching task data:", err);
          setError({ error: [err.message || 'Failed to fetch task details for editing.'] });
          setOpenError(true);
          setOpen(false);
        })
        .finally(() => {
          setIsLoadingTaskData(false);
          setOpenLoader(false);
        });
    }
    if (!open) {
      setClient({ nom: '', email: '', telephone: '' });
      setAutomobile({ immatriculation: '', kilometrage: '', vehicule: null, model: null });
      setTask({ id: '', title: '', description: '', assigned_to: null });
      setFormSettings(prev => ({ ...prev, activeStep: 0, isNextButton: false }));
    }

  }, [open, taskid]);

  const canNextClient = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return client.nom !== '' && client.email !== '' && emailPattern.test(client.email) && client.telephone !== '';
  };

  const canNextVehicule = () => {
    return (
      automobile.immatriculation !== '' &&
      automobile.kilometrage !== '' &&
      automobile.vehicule !== null &&
      automobile.model !== null
    );
  };

  const canNextTask = () => {
    return task.id !== '' && task.title !== '' && task.assigned_to !== null;
  };

  useEffect(() => {
    if (isLoadingTaskData) return;

    let canProceed = false;
    switch (formSettings.activeStep) {
      case 0:
        canProceed = canNextClient();
        break;
      case 1:
        canProceed = canNextVehicule();
        break;
      case 2:
        canProceed = canNextTask();
        break;
      case 3:
        canProceed = canNextClient() && canNextVehicule() && canNextTask();
        break;
      default:
        canProceed = false;
    }

    if (canProceed !== formSettings.isNextButton) {
      setFormSettings(prev => ({ ...prev, isNextButton: canProceed }));
    }

  }, [formSettings.activeStep, client, automobile, task, isLoadingTaskData]);

  const onSubmitForm = async (e, client, automobile, task) => {
    e.preventDefault();

    try {
      setOpenLoader(true);

      const url = `${GET_ENV().API_URL}/vehicules/${taskid}`;

      const body = {
        client_name: `${client.nom.toUpperCase()}`,
        client_email: client.email,
        client_telephone: client.telephone,
        vehicules_immatriculation: automobile.immatriculation,
        vehicules_kilometrage: automobile.kilometrage,
        makes: automobile.vehicule !== null ? automobile.vehicule[`name`] : null,
        model: automobile.model !== null ? automobile.model[`name`] : null,
        makes_id: automobile.vehicule !== null ? automobile.vehicule[`id`] : null,
        model_id: automobile.model !== null ? automobile.model[`id`] : null,
        task_id: task.id,
        task_title: task.title,
        task_description: task.description,
        assigned_to: task.assigned_to !== null ? task.assigned_to[`id`] : null,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Make the PUT request
      const response = await axios.put(url, body, config);
      setOpenLoader(false);

      if (response.data.status === 'success') {
        setOpen(false);
        Swal.fire('Updated!', 'Task details updated successfully.', 'success');
        onSuccessfulEdit();
      } else {
        setError(response.data.error || { error: ['Failed to update task. Server responded with an error.'] });
        setOpenError(true);
      }

    } catch (err) {
      setOpenLoader(false);
      console.error("Error updating task:", err);
      setError({ error: [err.message || 'An error occurred while sending updated task data.'] });
      setOpenError(true);
    }
  };

  const steps = () => {
    switch (formSettings.activeStep) {
      case 0:
        return <Client1 client={client} setClient={setClient} />;
      case 1:
        return (
          <Vehicule
            automobile={automobile}
            setAutomobile={setAutomobile}
            initialMakeId={automobile.original_makes_id}
            initialModelId={automobile.original_model_id}
          />
        );
      case 2:
        return (
          <Task3
            task={task}
            setTask={setTask}
            initialAssignedToId={task.original_assigned_to_id}
          />
        );
      case 3:
        return <Done />;
      default:
        return <div>Invalid Step</div>; // Or handle appropriately
    }
  };

  return (
    <Modal
      className="Modal-filter"
      open={open}
      onClose={(_event, reason) => {
        if (reason === 'backdropClick') {
          setOpenWarning(true); // Ask for confirmation on backdrop click
        } else {
          setOpen(false); // Close on escape key
        }
      }}
    >
      <ModalDialog className="Modal-filter-Dialog">
        {/* Add a check for loading initial data */}
        {isLoadingTaskData ? (
          <div>Loading task data...</div>
        ) : (
          <form className="Modal-filter-Dialog-Content">
            <h2 className="Modal-filter-Dialog-Content-title">
              Edit Task {taskid !== null ? `#${taskid}` : ''}
            </h2>
            <StepperTabs
              formSettings={formSettings}
              setFormSettings={setFormSettings}
            />
            {steps()}
            <div className="Modal-filter-Dialog-Content-btns">
              <div className="button">
                <Button
                  type="button"
                  onClick={() =>
                    formSettings.activeStep > 0 &&
                    setFormSettings({
                      ...formSettings,
                      activeStep: formSettings.activeStep - 1,
                    })
                  }
                  disabled={formSettings.activeStep <= 0}
                  color="neutral"
                  variant="solid"
                  sx={{ width: '100%' }}
                >
                  BACK
                </Button>
              </div>
              <div className="empty" />
              <div className="button">
                <Validate
                  open={openWarning}
                  setOpen={setOpenWarning}
                  handleCancel={() => { setOpen(false); handleCancel(); }}
                  message="Are you sure you want to discard changes and close the editor?"
                  confirmText="Discard Changes"
                  cancelText="Keep Editing"
                />
                <Button
                  type="button"
                  onClick={() => setOpenWarning(true)}
                  color="danger"
                  variant="solid"
                  sx={{ width: '100%' }}
                >
                  CANCEL
                </Button>
              </div>
              <div className="empty" />
              <div className="button">
                <Button
                  type={formSettings.activeStep === formSettings.stepsList.length - 1 ? 'submit' : 'button'}
                  onClick={
                    formSettings.activeStep < formSettings.stepsList.length - 1
                      ? () =>
                        setFormSettings({
                          ...formSettings,
                          activeStep: formSettings.activeStep + 1,
                        })
                      : (e) => onSubmitForm(e, client, automobile, task)
                  }
                  color={
                    formSettings.activeStep < formSettings.stepsList.length - 1
                      ? 'primary'
                      : 'success'
                  }
                  disabled={!formSettings.isNextButton || isLoadingTaskData}
                  variant="solid"
                  sx={{ width: '100%' }}
                >
                  {formSettings.activeStep !== formSettings.stepsList.length - 1
                    ? 'NEXT'
                    : 'VALIDER'
                  }
                </Button>
              </div>
            </div>
          </form>
        )}
      </ModalDialog>
    </Modal>
  );
}

