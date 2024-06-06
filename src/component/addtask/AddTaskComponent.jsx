// /* eslint-disable */
import { Button, Modal, ModalDialog } from '@mui/joy';
import StepperTabs from './steper';
import Client1 from './steps/Client1';
import Vehicule from './steps/Vehicule2';
import Task3 from './steps/Task3';
import Done from './steps/done';
import Validate from '../errornotif/validate';
import { useEffect, useState } from 'react';
import GET_ENV from '../../env/environnement';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/userSlice';
import axios from 'axios';
const AddTaskComponent = ({
  setOpenLoader = () => {},
  handleCancel = () => {},
  open = false,
  setOpen = () => {},
  setOpenError = () => {},
  setError = () => {},
}) => {
  const [openWarning, setOpenWarning] = useState(false); // warning if trying to close the modal
  const currentUser = useSelector(userSelector); // return the current user info saved in the redux
  const [formSettings, setFormSettings] = useState({
    isNextButton: false,
    stepsList: ['Client', 'Vehicule', 'task', 'done'],
    activeStep: 0,
  }); // the modal info
  /* Client.jsx state */
  const [client, setClient] = useState({
    isCheckForClient: false,
    nom: '',
    email: '',
    telephone: '',
  }); // the client info
  /*
   * canNextClient()
   * this function is to check if any client field is still empty
   * return true if any client field is empty
   * return false if all client fields are filled
   */
  const canNextClient = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (client.nom !== '' && client.email !== '' && client.telephone !== '') {
      if (!emailPattern.test(client.email)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  /* Vehicule.jsx state */
  const [automobile, setAutomobile] = useState({
    immatriculation: '',
    kilometrage: '',
    vehicule: null,
    model: null,
  }); // the vehicule info
  /*
   * canNextVehicule()
   * this function is to check if any vehicule field is still empty
   * return true if any client field is empty
   * return false if all client fields are filled
   */
  const canNextVehicule = () => {
    if (
      automobile.immatriculation !== '' &&
      automobile.kilometrage !== '' &&
      automobile.vehicule !== null &&
      automobile.model !== null
    ) {
      return true;
    } else {
      return false;
    }
  };
  /* Task.jsx state */
  const [task, setTask] = useState({
    title: '',
    description: '',
    assigned_to: null,
  }); // the task info
  /*
   * canNextTask()
   * this function is to check if any vehicule field is still empty
   * return true if any client field is empty
   * return false if all client fields are filled
   */
  const canNextTask = () => {
    if (task.title !== '' && task.assigned_to !== null) {
      return true;
    } else {
      return false;
    }
  };
  /*
    * this useEffect check if you can go to next step
    * if you can go to next step, the next button is enabled (isNextButton = true)
    * if you can't go to next step, the next button is disabled (isNextButton = false)
    * this useEffect run 3 function depends on the current step
    * if 0 it call canNextClient() function
    * if 1 it call canNextVehicule() function
    * if 2 it call canNextTask() function
    * else it ignore from the function
    * this use is run when any of this variables changes
      - activeStep
      - prenom
      - nom
      - email
      - telephone
      - immatriculation
      - kilometrage
      - vehicule
      - model
      - title
      - assigned_to
      - description
  */
  useEffect(() => {
    switch (formSettings.activeStep) {
      case 0:
        setFormSettings({ ...formSettings, isNextButton: canNextClient() });
        break;
      case 1:
        setFormSettings({ ...formSettings, isNextButton: canNextVehicule() });
        break;
      case 2:
        setFormSettings({ ...formSettings, isNextButton: canNextTask() });
        break;
      case 3:
        if (canNextClient() && canNextVehicule() && canNextTask()) {
          setFormSettings({ ...formSettings, isNextButton: true });
        } else {
          setFormSettings({ ...formSettings, isNextButton: false });
        }
        break;
    }
  }, [formSettings, client, automobile, task]);

  /*
   * onAddTaskHanddler() function used to post to the server
   *
   */
  const onSubmitForm = (client, automobile, task) => {
    // open the loading page (a spining red circle)
    setOpenLoader(true);

    // the back-end api link
    const url = `${GET_ENV().API_URL}/full_store`;

    // the body of the post request used to create data in database
    const body = {
      created_by: currentUser.id, // the current user id
      nom: `${client.nom.toUpperCase()}`,
      email: client.email,
      telephone: client.telephone,
      immatriculation: automobile.immatriculation,
      kilometrage: automobile.kilometrage,
      vehicule: automobile.vehicule,
      model: automobile.model,
      title: task.title,
      assigned_to: task.assigned_to,
      description: task.description,
    };

    // the config of the post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // the methode axios
    axios
      .post(url, body, config)
      .then((response) => {
        // if everything works fine we will get a success as response
        // else we will get a error as response
        if (response.data.status === 'success') {
          // reset_add_task_form_variables(); // wil reset all the variables to avoid finding them in the next model
          setOpenLoader(false); // close the loader page
          setOpen(false); // close the modal
        } else if (response.data.status === 'error') {
          setOpenLoader(false); // close the loader page
          setError(response.data.error); // set error to error message from server
          setOpenError(true); // open the error notification
        }
      })
      .catch((err) => {
        // this work if there is no server running or the url is not valid (and some other reason)
        setError(err.data.error); // set error to error message from server
        setOpenError(true); // open the error notification
      });
  };

  const steps = () => {
    switch (formSettings.activeStep) {
      case 0:
        return <Client1 client={client} setClient={setClient} />;
      case 1:
        return (
          <Vehicule automobile={automobile} setAutomobile={setAutomobile} />
        );
      case 2:
        return <Task3 task={task} setTask={setTask} />;
      case 3:
        return <Done />;
      default:
        break;
    }
  };
  return (
    <Modal
      className="Modal-filter"
      open={open}
      onClose={(_event, reason) => {
        if (reason !== 'backdropClick') {
          setOpen(false);
        } else {
          return;
        }
      }}
    >
      <ModalDialog className="Modal-filter-Dialog">
        <form className="Modal-filter-Dialog-Content">
          <h2 className="Modal-filter-Dialog-Content-title">
            Ajouter Une Tache :
          </h2>
          <StepperTabs
            formSettings={formSettings}
            setFormSettings={setFormSettings}
          />
          {steps()}
          <div className="Modal-filter-Dialog-Content-btns">
            <div className="button">
              <Button
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
                handleCancel={handleCancel}
              />
              <Button
                onClick={() => setOpenWarning(true)}
                color="danger"
                variant="solid"
                sx={{ width: '100%' }}
              >
                ANNULER
              </Button>
            </div>
            <div className="empty" />
            <div className="button">
              <Button
                onClick={
                  formSettings.activeStep < formSettings.stepsList.length - 1
                    ? () =>
                        setFormSettings({
                          ...formSettings,
                          activeStep: formSettings.activeStep + 1,
                        })
                    : onSubmitForm(client, automobile, task)
                }
                color={
                  formSettings.activeStep < formSettings.stepsList.length - 1
                    ? 'primary'
                    : 'success'
                }
                disabled={!formSettings.isNextButton}
                variant="solid"
                sx={{ width: '100%' }}
              >
                {formSettings.activeStep !== formSettings.stepsList.length - 1
                  ? 'NEXT'
                  : 'VALIDER'}
              </Button>
            </div>
          </div>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddTaskComponent;
