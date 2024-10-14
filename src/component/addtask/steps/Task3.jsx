import {
  FormControl,
  FormLabel,
  Input,
  Grid,
  Textarea,
  Autocomplete,
} from '@mui/joy';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GET_ENV from '../../../env/environnement';

export default function Task3({ task = {}, setTask = () => {} }) {
  // {
  //   id: '',
  //   title: '',
  //   description: '',
  //   assigned_to: null,
  // }
  const [users, setUsers] = useState([]);
  /*
  [
    {
        "id": 2,
        "name": "admin admin",
        "email": "admin@admin.com",
        "status": "ADMIN",
        "role_id": 2,
        "Role": "ADMIN",
        "role": {
            "id": 2,
            "description": "full controle, control users, CRUD db",
            "type": "ADMIN"
        }
    },
  ]
  */
  useEffect(() => {
    axios
      .get(`${GET_ENV().API_URL}/users`)
      .then((response) => {
        // console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [task.assigned_to]);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={6}>
        <FormControl>
          <FormLabel>Tache ID :</FormLabel>
          <Input
            placeholder="Tache ID"
            value={task.id}
            onChange={(e) => setTask({ ...task, id: e.target.value })}
          />
        </FormControl>
      </Grid>
      <Grid xs={6}>
        <FormControl>
          <FormLabel>Title :</FormLabel>
          <Input
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </FormControl>
      </Grid>
      <Grid xs={6}>
        <FormControl>
          <FormLabel>Assigned to:</FormLabel>
          <Autocomplete
            placeholder="Assigned to:"
            options={users}
            value={task.assigned_to}
            onChange={(e, newValue) => {
              setTask({ ...task, assigned_to: newValue });
            }}
            startDecorator={<i className="fa-sharp fa-solid fa-car"></i>}
            variant="soft"
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl>
          <FormLabel>description :</FormLabel>
          <Textarea
            minRows={3}
            placeholder="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
