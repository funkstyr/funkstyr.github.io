import axios from 'axios';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  //const { data } = await axios.get('/api/current_user');
  const data = { username: 'tester' };

  dispatch({ type: FETCH_USER, payload: data });
};
