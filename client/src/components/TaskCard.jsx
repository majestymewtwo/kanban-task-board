import React from "react";
import { EditTask } from "./EditTask";

export const TaskCard = (props) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", props.id);
    e.dataTransfer.setData("taskTitle", props.title);
    e.dataTransfer.setData("taskDesc", props.description);
  };

  const deleteTask = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/tasks/delete/${props.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.ok) {
      props.callback(true);
    }
  };

  return (
    <div
      className='shadow-lg rounded-lg space-y-3 w-fit bg-white cursor-pointer'
      draggable='true'
      onDragStart={handleDragStart}>
      <div className='bg-cyan-500 px-5 py-3 font-bold text-white rounded-t-lg flex justify-between items-center'>
        <h1>{props.title}</h1>
        <div className='flex items-center space-x-4'>
          <EditTask
            id={props.id}
            title={props.title}
            description={props.description}
            status={props.status}
            callback={(val) => props.callback(val)}
          />
          <img
            src='delete.png'
            className='w-5 h-5 hover:scale-105 transition-all ease-in-out duration-200'
            alt='delete'
            onClick={deleteTask}
          />
        </div>
      </div>
      <p className='text-gray-600 px-5 py-3 text-sm'>{props.description}</p>
    </div>
  );
};
