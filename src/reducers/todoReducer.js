var initialState = {
  items: []
};
export default function todoReducer(state = initialState, action) {
  var newItems;
  switch (action.type) {
    case "SET_ITEM":
      return { ...state, items: action.payload };
    case "UPDATE_ITEM":
      newItems = state.items.map(item => {
        if (item._id === action.payload._id) return action.payload;
        else return item;
      });
      return { ...state, items: newItems };
    case "ADD_ITEM":
      newItems = state.items.concat(action.payload);
      return { ...state, items: newItems };
    case "DELETE_ITEM":
      newItems = state.items.filter(item => item._id !== action.payload._id);
      return { ...state, items: newItems };
    default:
      return state;
  }
}
