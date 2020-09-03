import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUsersList() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/user/all', config);

    yield put({ type: 'SET_USERS_LIST', payload: response.data });
  } catch (error) {
    console.log('Failed to GET the list of users:', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USERS_LIST', fetchUsersList);
}

export default userSaga;
