const chatWithReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHAT_WITH':
      return action.payload;
    case 'CLEAR_CHAT_WITH':
      return {};
    default:
      return state;
  }
};

export default chatWithReducer;
