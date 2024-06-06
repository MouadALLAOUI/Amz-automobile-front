import { useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, Grid, Autocomplete } from '@mui/joy';
import axios from 'axios';
import GET_ENV from '../../../env/environnement';

const Vehicule = ({ automobile = {}, setAutomobile = () => {} }) => {
  const [CARS_Makes, setCARS_Makes] = useState([]);
  useEffect(() => {
    axios
      .get(`${GET_ENV().API_URL}/carmakes`)
      .then((response) => {
        console.log(response.data);
        setCARS_Makes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={6}>
        <FormControl>
          <FormLabel>immatriculation de vehicule :</FormLabel>
          <Input
            placeholder="immatriculation de vehicule"
            value={automobile.immatriculation}
            onChange={(e) =>
              setAutomobile({ ...automobile, immatriculation: e.target.value })
            }
          />
        </FormControl>
      </Grid>
      <Grid xs={6}>
        <FormControl>
          <FormLabel>kilometrage :</FormLabel>
          <Input
            placeholder="kilometrage (km)"
            value={automobile.kilometrage}
            onChange={(e) =>
              setAutomobile({
                ...automobile,
                kilometrage: e.target.value,
              })
            }
            type="number"
            slotProps={{
              input: {
                min: 0,
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid xs={6}>
        <FormControl>
          <FormLabel>Vehilcule Marque :</FormLabel>
          <Autocomplete
            placeholder="Vehilcule Marque"
            options={CARS_Makes}
            value={automobile.vehicule}
            onChange={(e, newValue) => {
              setAutomobile({ ...automobile, vehicule: newValue });
            }}
            startDecorator={<i className="fa-sharp fa-solid fa-car"></i>}
            variant="soft"
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
          />
        </FormControl>
      </Grid>
      <Grid xs={6}>
        <FormControl>
          <FormLabel>Vehilcule Model :</FormLabel>
          <Autocomplete
            placeholder="Vehilcule Model"
            options={
              automobile.vehicule !== null ? automobile.vehicule.models : []
            }
            value={automobile.model}
            onChange={(e, newValue) => {
              setAutomobile({ ...automobile, model: newValue });
            }}
            startDecorator={<i className="fa-sharp fa-solid fa-engine"></i>}
            variant="soft"
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Vehicule;
