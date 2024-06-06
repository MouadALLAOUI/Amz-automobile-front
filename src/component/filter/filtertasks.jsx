// /* eslint-disable */
import { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Grid,
} from '@mui/joy';
import CustomSelect from '../custom_select/CustomSelect';

export default function TaskFilterComponent({
  handleApply = () => {},
  handleCancel = () => {},
  open = false,
  setOpen = () => {},
  isUser = false,
}) {
  const getDate = () => {
    let date = new Date();

    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);

    let formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
  };

  // filter tasks by
  const [options, setOptions] = useState([]); // options shown in the filter by select
  const [filtrerPar, setFiltrerPar] = useState(isUser ? 'NOM' : 'DATE'); // value of the filter by select
  // useState used to change filter by option if the filter is for user of else
  useEffect(() => {
    if (isUser) {
      setOptions(['DATE', 'NOM', 'PRENOM', 'EMAIL', 'ROLE', 'STATUS']);
    } else {
      setOptions([
        'DATE',
        'PEREMPTION',
        'CATEGORIE',
        'DESIGNATION',
        'QUANTITE',
      ]);
    }
  }, []);
  // filter tasks type
  const [optionsType, setOptionsType] = useState([]); // options shown in the filter type select
  const [filterType, setFilterType] = useState('DATE EGALE A'); // value of the filter type select

  // filter inputs
  const [dateSuperieurA, setDateSuperieurA] = useState(getDate());
  const [dateInferieurA, setDateInferieurA] = useState(getDate());
  const [dateEgaleA, setDateEgaleA] = useState(getDate());

  const [commencePar, setCommencePar] = useState('');
  const [terminePar, setTerminePar] = useState('');
  const [egaleA, setEgaleA] = useState('');
  const [inférieurA, setInférieurA] = useState(0);
  const [supérieurA, setSupérieurA] = useState(0);

  // useState to manage the change in filter tasks by select and show option in filter type select according to filter by
  useEffect(() => {
    if (filtrerPar === 'DATE' || filtrerPar === 'PEREMPTION') {
      setOptionsType(['DATE EGALE A', 'DATE SUPERIEUR A', 'DATE INFERIEUR A']);
      setFilterType('DATE EGALE A');
    } else if (
      filtrerPar === 'CATEGORIE' ||
      filtrerPar === 'DESIGNATION' ||
      filtrerPar === 'NOM' ||
      filtrerPar === 'PRENOM' ||
      filtrerPar === 'EMAIL'
    ) {
      setOptionsType(['EGALE A', 'COMMENCE PAR', 'TERMINE PAR']);
      setFilterType('EGALE A');
    } else if (filtrerPar === 'ROLE') {
      setOptionsType(['ROLE EGALE A']);
      setFilterType('ROLE EGALE A');
    } else if (filtrerPar === 'STATUS') {
      setOptionsType(['STATUS EGALE A']);
      setFilterType('STATUS EGALE A');
    } else if (filtrerPar === 'QUANTITE') {
      setOptionsType(['EGALE A', 'INFERIEUR A', 'SUPERIEUR A']);
      setFilterType('EGALE A');
    }
  }, [filtrerPar]);
  useEffect(() => {
    resetField();
  }, [filtrerPar, filterType]);

  const resetField = () => {
    setCommencePar('');
    setTerminePar('');
    setEgaleA('');
    setInférieurA('');
    setSupérieurA('');
    setDateSuperieurA(getDate());
    setDateInferieurA(getDate());
    setDateEgaleA(getDate());
  };
  const resetForm = () => {
    setFiltrerPar(isUser ? 'NOM' : 'DATE');
    setFilterType('DATE EGALE A');
    resetField();
  };
  return (
    <Modal className="Modal-filter" open={open} onClose={() => setOpen()}>
      <ModalDialog
        className="Modal-filter-Dialog"
        aria-labelledby="filter"
        aria-describedby="filter-tasks"
      >
        <div className="form Modal-filter-Dialog-Content">
          <h2 className="Modal-filter-Dialog-Content-title">
            Filtrer les Taches :
          </h2>
          <Grid container spacing={1} sx={{ flexGrow: 1 }}>
            <Grid xs={6}>
              <FormControl>
                <FormLabel>Filtrer par :</FormLabel>
                <CustomSelect
                  id="filterPar"
                  name="filterPar"
                  placeholder="Filtrer Par"
                  value={filtrerPar}
                  onChange={(e, value) => setFiltrerPar(value)}
                  options={options}
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <FormLabel>Type de filtre :</FormLabel>
                <CustomSelect
                  id="filterPar"
                  name="filterPar"
                  placeholder="Type de filtre"
                  value={filterType}
                  onChange={(e, value) => setFilterType(value)}
                  options={optionsType}
                />
              </FormControl>
            </Grid>

            <Grid xs={6}>
              <FormControl>
                <FormLabel>Date égale à :</FormLabel>
                <Input
                  type="date"
                  disabled={filterType !== 'DATE EGALE A'}
                  value={dateEgaleA}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setDateEgaleA(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <FormLabel>Date supérieur à :</FormLabel>
                <Input
                  type="date"
                  disabled={filterType !== 'DATE SUPERIEUR A'}
                  value={dateSuperieurA}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setDateSuperieurA(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid xs={6}>
              <FormControl>
                <FormLabel>Date inférieur à :</FormLabel>
                <Input
                  type="date"
                  disabled={filterType !== 'DATE INFERIEUR A'}
                  value={dateInferieurA}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setDateInferieurA(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <FormLabel>Egale à :</FormLabel>
                <Input
                  disabled={filterType !== 'EGALE A'}
                  placeholder="EGALE A"
                  value={egaleA}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setEgaleA(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid xs={6}>
              <FormControl>
                <FormLabel>Commence Par :</FormLabel>
                <Input
                  disabled={filterType !== 'COMMENCE PAR'}
                  placeholder="COMMENCE PAR"
                  value={commencePar}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setCommencePar(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <FormLabel>Termine par :</FormLabel>
                <Input
                  disabled={filterType !== 'TERMINE PAR'}
                  placeholder="TERMINE PAR"
                  value={terminePar}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setTerminePar(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid xs={6}>
              <FormControl>
                <FormLabel>Inférieur à :</FormLabel>
                <Input
                  type="number"
                  disabled={filterType !== 'INFERIEUR A'}
                  placeholder="INFERIEUR A"
                  value={inférieurA}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setInférieurA(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl>
                <FormLabel>Supérieur à :</FormLabel>
                <Input
                  type="number"
                  disabled={filterType !== 'SUPERIEUR A'}
                  placeholder="SUPERIEUR A"
                  value={supérieurA}
                  color="neutral"
                  variant="soft"
                  onChange={(e) => setSupérieurA(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <div className="Modal-filter-Dialog-Content-btns">
            <div className="button">
              <Button
                onClick={handleCancel}
                color="neutral"
                variant="outlined"
                sx={{ width: '100%' }}
              >
                ANNULER
              </Button>
            </div>
            <div className="empty" />
            <div className="button">
              <Button
                onClick={resetForm}
                color="danger"
                variant="solid"
                sx={{ width: '100%' }}
              >
                SUPPRIMER LE FILTRE
              </Button>
            </div>
            <div className="empty" />
            <div className="button">
              <Button
                onClick={handleApply}
                color="success"
                variant="solid"
                sx={{ width: '100%' }}
              >
                VALIDER
              </Button>
            </div>
          </div>
        </div>
      </ModalDialog>
    </Modal>
  );
}
