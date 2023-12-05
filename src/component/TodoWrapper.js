import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo) => {
    const newTodo = { task: todo, completed: false, isEditing: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const editTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List With React js </h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={index} editTodo={(task) => editTask(task, index)} task={todo} />
        ) : (
          <Todo
            key={index}
            task={todo}
            deleteTodo={() => deleteTodo(index)}
            editTodo={() => editTodo(index)}
            toggleComplete={() => toggleComplete(index)}
          />
        )
      )}
    </div>
  );
};
