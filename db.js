class TodoListSingleton {
 static todoListInstance = null;
 constructor() {
   this.todos = ["todo 0"];
 }
 
 static getTodoListInstance() {
       if (!TodoListSingleton.todoListInstance) {
          TodoListSingleton.todoListInstance = new TodoListSingleton();
       }
       return TodoListSingleton.todoListInstance;
     }
 
 addTodo() {
  var newTodo = "todo " + this.todos.length;
  this.todos.push(newTodo);
 }

 getTodo(id) {
 }

 getAllTodos() {
   return this.todos;
 }

 modifyTodo(id) {
 }

 deleteTodo(id) {
 }

 deleteAllTodos() {
 }

}//End TodosSingleton Class

module.exports = {TodoListSingleton};