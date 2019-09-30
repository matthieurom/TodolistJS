var initialState = {
  todos: []
};
export default function todoReducer(state = initialState, action) {
  var newTodo;
  switch (action.type) {
    // case "SET_ITEM":
    //   return { ...state, items: action.payload };
    // case "UPDATE_ITEM":
    //   newItems = state.items.map(item => {
    //     if (item._id === action.payload._id) return action.payload;
    //     else return item;
    //   });
    //   return { ...state, items: newItems };
    // case "ADD_ITEM":
    //   newItems = state.items.concat(action.payload);
    //   return { ...state, items: newItems };
    // case "DELETE_ITEM":
    //   newItems = state.items.filter(item => item._id !== action.payload._id);
    //   return { ...state, items: newItems };
    case "ADD_TODO":
      newTodo = state.todos.concat(action.payload);
      return { ...state, todos: newTodo };
    case "SET_TODO":
      return { ...state, todos: action.payload };
    case "UPDATE_TODO":
      newTodo = state.todos.map(todo => {
        if (todo._id === action.payload._id) return action.payload;
        else return todo;
      });
      return { ...state, todos: newTodo };
    case "DELETE_TODO":
      newTodo = state.todos.filter(todo => todo._id !== action.payload._id);
      return { ...state, todos: newTodo };
    default:
      return state;
  }
}
