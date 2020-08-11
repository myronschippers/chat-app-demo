const testableUsers = [
  {
    username: 'newDugg',
    id: 1,
  },
  {
    username: 'myNameIsTim',
    id: 2,
  },
]
const usersListReducer = (state = testableUsers, action) => {
  switch (action.type) {
    case 'SET_USERS_LIST':
      return action.payload;
    case 'CLEAR_USERS':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default usersListReducer;
