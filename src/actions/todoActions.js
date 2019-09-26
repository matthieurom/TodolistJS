export function updateTodo(item) {
  return {
    type: "UPDATE_ITEM",
    payload: item
  };
}
export function addTodo(item) {
  return {
    type: "ADD_ITEM",
    payload: item
  };
}
export function deleteTodo(item) {
  return {
    type: "DELETE_ITEM",
    payload: item
  };
}
export function setTodos(todos) {
  return {
    type: "SET_TODO",
    payload: todos
  };
}
export function setUser(user) {
  return {
    type: "SET_USER",
    payload: user
  };
}
