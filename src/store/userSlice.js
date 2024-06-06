import { createSlice } from '@reduxjs/toolkit';
//import axios from "axios";
//import getEnvironnement from "../environnement";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    role: 'ADMIN',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setRole } = userSlice.actions;

export default userSlice.reducer;

// export const getUser = (id) => {
//   return async (dispatch) => {
//     axios.get(`${getEnvironnement().API_URL}/users/${id}`)
//       .then((response) => dispatch(setUser(response.data)));
//   };
// };

export const userSelector = (state) => state.user.user;
export const userRoleSelector = (state) => state.user.role;
