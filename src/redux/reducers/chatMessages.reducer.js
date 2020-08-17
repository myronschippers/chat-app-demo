const chatMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHAT_MESSAGES':
      return action.payload;
    case 'CLEAR_CHAT_MESSAGES':
      return {};
    default:
      return state;
  }
};

export default chatMessagesReducer;
