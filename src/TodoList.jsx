import React, { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const taskList = tasks.map((task) => (
    <div className="task" key={task.id}>
      {editingTask === task.id ? (
        <div className="edit-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="edit-input"
          />
          <button
            className="save-button"
            onClick={() => handleSaveEdit(task.id)}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="display-task">
          <span>{task.title}</span>
          <button className="edit-button" onClick={() => handleEdit(task.id)}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ));

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const handleSaveEdit = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTask } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setNewTask("");
  };

  const handleEdit = (taskId) => {
    setEditingTask(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask(taskToEdit.title);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      {taskList}
      <form onSubmit={handleAdd} className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="add-task-input"
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TodoList;
