import React from "react";

import React, { Component } from "react";
import "./style.css";

const COMPLETED = "COMPLETED";
const TODOS = "TODOS";

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: this.getTodosFromStorage() || [
        {
          taskID: 1,
          task: "Walk the walk"
        },
        {
          taskID: 2,
          task: "Talk the talk"
        },
        {
          taskID: 3,
          task: "Jump the jump"
        }
      ],
      completedTasks: this.getCompletedFromStorage() || [
        {
          taskID: 4,
          task: "Test the test!"
        }
      ],
      draggedTask: {}
    };
  }

  // Local storage handlers
  getTodosFromStorage = () => {
    return JSON.parse(localStorage.getItem(TODOS));
  }

  getCompletedFromStorage = () => {
    return JSON.parse(localStorage.getItem(COMPLETED));
  }

  saveCompletedToStorage = (completed) => {
    localStorage.setItem(COMPLETED, JSON.stringify(completed));
  }

  saveTodosToStorage = (todos) => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }
  // End Local storage handlers

  onDragTodo = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  };

  onDragOverTodo = event => {
    event.preventDefault();
   };

  // When dropping a completed todo back to todo list
  onDropTodo = event => {
    const { completedTasks, draggedTask, todos } = this.state;

    // Ignore if task is dropped in the same box
    var found =  todos.filter(todo => todo.taskID === draggedTask.taskID)
    if(found.length>0){
      return;
    }

    this.setState({
      todos: [...todos, draggedTask],
      completedTasks: completedTasks.filter(task => task.taskID !== draggedTask.taskID),
      draggedTask: {}
    });

  };


  onDragCompleted = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  };

  onDragOverCompleted = event => {
    event.preventDefault();
  };

  // When dropping a todo to completed
  onDropCompleted = event => {
    const { completedTasks, draggedTask, todos } = this.state;

    // Ignore if task is dropped in the same box
    var found =  completedTasks.filter(task => task.taskID === draggedTask.taskID)
    console.log(found);
    if(found.length > 0){
      return;
    }

    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      todos: todos.filter(task => task.taskID !== draggedTask.taskID),
      draggedTask: {}
    });

  };

  // Save the todos and completed on each rendering/update
  componentDidUpdate(){
    this.saveTodosToStorage(this.state.todos);
    this.saveCompletedToStorage(this.state.completedTasks);
  }


  render() {
    const { todos, completedTasks } = this.state;

    return (
      <div className="App">
        <div  className="todos"
          onDrop={event => this.onDropTodo(event)}
          onDragOver={event => this.onDragOverTodo(event)}
        >
        <div className="header">Todo</div>
          <div>
            {todos.map(todo => (
              <div
                key={todo.taskID}
                draggable
                onDrag={event => this.onDragTodo(event, todo)}
              >
                {todo.task}
              </div>
            ))}
          </div>
        </div>
        <div 
          onDrop={event => this.onDropCompleted(event)}
          onDragOver={event => this.onDragOverCompleted(event)}
          className="done"
        >
        <div className="header">Completed</div>
          {completedTasks.map((task, index) => (
            <div 
            key={task.taskID} 
            draggable
            onDrag={event => this.onDragCompleted(event, task)}
            >
              {task.task}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Todo;
