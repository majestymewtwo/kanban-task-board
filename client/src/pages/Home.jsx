import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { TaskCard } from "../components/TaskCard";
import { NewTask } from "../components/NewTask";

export const Home = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setTasks(data.tasks);
  };

  const handleCallback = (bool) => {
    if (bool) getTasks();
  };

  const handleDrop = async (e, status) => {
    const id = e.dataTransfer.getData("taskId");
    const title = e.dataTransfer.getData("taskTitle");
    const desc = e.dataTransfer.getData("taskDesc");

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/tasks/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: title,
          description: desc,
          status: status,
        }),
      }
    );
    if (response.ok) {
      getTasks();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className='relative min-h-screen bg-slate-100'>
      <Navbar />

      <div className='flex flex-col md:flex-row items-center md:justify-around md:items-start'>
        {/* To-Do */}
        <div
          className='flex flex-col p-5 space-y-5 md:w-1/3 items-center'
          onDrop={(e) => handleDrop(e, "to-do")}
          onDragOver={(e) => e.preventDefault()}>
          <div className='flex items-center'>
            <h3 className='md:text-xl'>To-Do Tasks</h3>
            <NewTask status='to-do' callback={handleCallback} />
          </div>
          {tasks.map((task) => {
            if (task.status === "to-do") {
              return (
                <TaskCard
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  callback={handleCallback}
                />
              );
            }
          })}
        </div>
        {/* Doing */}
        <div
          className='flex flex-col p-5 space-y-5 md:w-1/3 items-center'
          onDrop={(e) => handleDrop(e, "doing")}
          onDragOver={(e) => e.preventDefault()}>
          <div className='flex items-center'>
            <h3 className='md:text-xl'>Doing Tasks</h3>
            <NewTask status='doing' callback={handleCallback} />
          </div>
          {tasks.map((task) => {
            if (task.status === "doing") {
              return (
                <TaskCard
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  callback={handleCallback}
                />
              );
            }
          })}
        </div>
        {/* Done */}
        <div
          className='flex flex-col p-5 space-y-5 md:w-1/3 items-center'
          onDrop={(e) => handleDrop(e, "done")}
          onDragOver={(e) => e.preventDefault()}>
          <div className='flex items-center'>
            <h3 className='md:text-xl'>Done Tasks</h3>
            <NewTask status='done' callback={handleCallback} />
          </div>
          {tasks.map((task) => {
            if (task.status === "done") {
              return (
                <TaskCard
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  callback={handleCallback}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
