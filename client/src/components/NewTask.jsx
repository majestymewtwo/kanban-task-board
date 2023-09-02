import React, { useState } from "react";

export const NewTask = ({ status, callback }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleClose = () => {
    setDesc("");
    setTitle("");
    setOpen(false);
  };

  const addTask = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/tasks/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
          title: title,
          description: desc,
          status: status,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      callback(true);
      handleClose();
    } else alert(data.error);
  };

  return (
    <>
      {open && (
        <>
          <div
            className='overlay absolute inset-0 bg-black opacity-50 min-h-screen'
            onClick={() => setOpen(false)}></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg space-y-3 w-[80%] md:w-1/3 flex flex-col bg-white'>
            <input
              type='text'
              placeholder='Title'
              value={title}
              spellCheck='false'
              onChange={(e) => setTitle(e.target.value)}
              className='bg-cyan-700 px-5 py-3 font-bold text-white rounded-t-lg focus:outline-none'
            />
            <textarea
              placeholder='Description'
              type='text'
              spellCheck='false'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='text-gray-600 px-5 py-3 text-sm focus:outline-none min-h-[400px] resize-none rounded-b-lg'
            />
            <div className='flex p-3 space-x-3'>
              <button
                onClick={addTask}
                className='w-full bg-cyan-500 text-white focus:outline-none rounded-md px-3 py-1'>
                ADD
              </button>
              <button
                className='w-full bg-cyan-800 text-white focus:outline-none rounded-md px-3 py-1'
                onClick={handleClose}>
                CANCEL
              </button>
            </div>
          </div>
        </>
      )}
      <div
        onClick={() => setOpen(true)}
        className='px-5 cursor-pointer font-black flex items-center space-x-2 my-3'>
        <span
          className={`h-8 w-8 bg-cyan-500 text-white font-black rounded-full text-center hover:scale-110 transition-all ease-in-out duration-300 text-lg ${
            open && "opacity-0"
          }`}>
          +
        </span>
      </div>
    </>
  );
};
