import React, { useState } from "react";

import "./styles/global.scss";
import styles from "./App.module.scss";

import { ClipboardText, Plus } from "phosphor-react";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("@AfroToDo:tasks");

    return JSON.parse(localTasks) || [];
  });

  const doneCount = tasks.reduce((acumulator, task) => {
    return task.done ? (acumulator += 1) : acumulator;
  }, 0);

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      content: taskText,
      done: false,
    };

    const newTasks = [...tasks, newTask];

    localStorage.setItem("@AfroToDo:tasks", JSON.stringify(newTasks));

    setTasks(newTasks);
    setTaskText("");
  }

  function handleChangeInput(e) {
    setTaskText(e.currentTarget.value);
  }

  function handleToggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, done: !task.done } : task;
    });
    localStorage.setItem("@AfroToDo:tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id) {
    const filteredTask = tasks.filter((task) => {
      return task.id !== id;
    });

    localStorage.setItem("@AfroToDo:tasks", JSON.stringify(filteredTask));
    setTasks(filteredTask);
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <form className={styles.addTaskForm} onSubmit={handleSubmit}>
          <input
            onChange={handleChangeInput}
            name="task"
            type="text"
            value={taskText}
            placeholder="Insira uma nova atividade "
          />
          <button>
            <Plus />
          </button>
        </form>

        {tasks.length ? (
          <>
            <h3 className={styles.status}>
              Tarefas concluídas{" "}
              <span>
                {doneCount} de {tasks.length}
              </span>
            </h3>

            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  content={task.content}
                  isDone={task.done}
                  onCheck={() => handleToggleTask(task.id)}
                  onDelete={() => handleRemoveTask(task.id)}
                />
              ))}
            </ul>
          </>
        ) : (
        <div className={styles.empty}>
          <ClipboardText/>
          <p>Você não possui nenhuma tarefa no momento.</p>
          <span>Adicione novas tarefas para que elas sejam mostradas.</span>
        </div>)}
      </main>
    </>
  );
}

export default App;
