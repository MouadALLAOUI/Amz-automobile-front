import {
  FormControl,
  FormLabel,
  Input,
  Grid,
  Switch,
  // Autocomplete,
  FormHelperText,
} from '@mui/joy';
// import axios from 'axios';
import { useEffect, useState } from 'react';
// import GET_ENV from '../../../env/environnement';

const Client1 = ({ client = {}, setClient = () => {} }) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [emailErr, setClientEmailErr] = useState(''); // the email err of the client

  useEffect(() => {
    if (client.email !== '' && !emailPattern.test(client.email)) {
      setClientEmailErr(
        'this is not a valid email address try something like email@example.com'
      );
    } else {
      setClientEmailErr('');
    }
  }, [client.email]);

  // const [clientList, setClientList] = useState([]);
  let clientIsCheck = client.isCheckForClient;
  // useEffect(() => {
  //   setClient({ ...client, nom: '', email: '', telephone: '' });
  //   axios
  //     .get(`${GET_ENV().API_URL}/clients`)
  //     .then((response) => {
  //       setClientList(response.data);
  //       // console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [clientIsCheck]);
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={12}>
        <FormControl
          orientation="horizontal"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <FormLabel>check for client :</FormLabel>
          <Switch
            color={clientIsCheck ? 'success' : 'danger'}
            variant="solid"
            checked={clientIsCheck}
            onChange={() =>
              setClient({
                ...client,
                isCheckForClient: !clientIsCheck,
              })
            }
          />
        </FormControl>
      </Grid>
      {/* {clientIsCheck && (
        <Grid xs={12}>
          <FormControl>
            <FormLabel>select the client :</FormLabel>
            <Autocomplete
              placeholder="List de Clients"
              options={clientList}
              // value={marque}
              onChange={(e, newValue) => {
                setClient({
                  ...client,
                  nom: newValue.nom,
                  email: newValue.email,
                  telephone: newValue.telephone,
                });
              }}
              startDecorator={<i className="fa-sharp fa-solid fa-car"></i>}
              variant="soft"
              // sx={{ width: 300 }}
              getOptionLabel={(option) => option.nom}
            />
          </FormControl>
        </Grid>
      )} */}
      <Grid xs={12}>
        <FormControl>
          <FormLabel>nom de client :</FormLabel>
          <Input
            placeholder="nom de client"
            value={client.nom}
            onChange={(e) => setClient({ ...client, nom: e.target.value })}
            disabled={clientIsCheck}
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl>
          <FormLabel>email de client :</FormLabel>
          <Input
            type="email"
            placeholder="ex: client@example.com"
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
            error={client.email !== '' && !emailPattern.test(client.email)}
            disabled={clientIsCheck}
          />
        </FormControl>
        <FormHelperText>
          <code>{emailErr}</code>
        </FormHelperText>
      </Grid>
      <Grid xs={12}>
        <FormControl>
          <FormLabel>telephone de client :</FormLabel>
          <Input
            placeholder="telephone ou fax"
            value={client.telephone}
            onChange={(e) =>
              setClient({ ...client, telephone: e.target.value })
            }
            disabled={clientIsCheck}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Client1;
