var initialState = {
  todos: []
};
export default function todoReducer(state = initialState, action) {
  var newTodo;
  switch (action.type) {
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
      // newTodo = state.todos.filter(todo => todo._id !== action.payload._id);
      return { ...state, todos: action.payload };
    default:
      return state;
  }
}
