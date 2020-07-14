import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  const config = {
    headers: {
      'Conten-Type': 'application/json',
    },
  };

  try {
    const res = axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};