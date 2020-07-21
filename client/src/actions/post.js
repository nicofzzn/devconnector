import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, GET_PROFILE } from './types';

// get post
export const getPost = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
