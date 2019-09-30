export function addTodo(todo) {
  return {
    type: "ADD_TODO",
    payload: todo
  };
}
export function deleteTodo(todo) {
  return {
    type: "DELETE_TODO",
    payload: todo
  };
}
export function setTodos(todos) {
  return {
    type: "SET_TODO",
    payload: todos
  };
}
export function updateTodo(todo) {
  return {
    type: "UPDATE_TODO",
    payload: todo
  };
}
export function setUser(user) {
  return {
    type: "SET_USER",
    payload: user
  };
}
