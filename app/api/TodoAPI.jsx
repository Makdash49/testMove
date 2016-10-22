var $ = require('jquery');

module.exports = {
  setTodos: function(todos) {
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    try {
      todos = JSON.parse(stringTodos);
    } catch (e) {

    }

    return $.isArray(todos) ? todos : [];
  },
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      var todoText = todo.text.toLowerCase();
      if (searchText === '') {
        return true
      } else if (todoText.indexOf(searchText) === -1) {
        return false
      } else {
        return true
      }
    });

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if(!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};

// filter method
// Call filter on filteredTodos.
// check for search text. If search text is empty always return true
// so you return every todo item.
// If there is search text you, see if it is in each todo.
// Use "string".indexOf('').  If it's in there it returns the index. Not returns
// -1.
// First convert the text to lowercase on the todo.
