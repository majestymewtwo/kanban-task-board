import React, { useEffect, useState } from "react";

export const EditTask = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.description);
  const [status, setStatus] = useState(props.status);

  const handleClose = () => {
    setDesc("");
    setTitle("");
    setOpen(false);
  };

  useEffect(() => {
    setTitle(props.title);
    setDesc(props.description);
    setStatus(props.status);
  }, [open]);

  const updateTask = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/tasks/update/${props.id}`,
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
      handleClose();
      props.callback(true);
    }
  }

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
            <div className="flex space-x-2 px-5">
              <button className={`${status==='to-do' ? 'text-white bg-cyan-700' : 'text-slate-700 border border-slate-600'} w-1/3 px-2 py-1 rounded-md`} onClick={() => setStatus('to-do')}>TO-DO</button>
              <button className={`${status==='doing' ? 'text-white bg-cyan-700' : 'text-slate-700 border border-slate-600'} w-1/3 px-2 py-1 rounded-md`} onClick={() => setStatus('doing')}>DOING</button>
              <button className={`${status==='done' ? 'text-white bg-cyan-700' : 'text-slate-700 border border-slate-600'} w-1/3 px-2 py-1 rounded-md`} onClick={() => setStatus('done')}>DONE</button>
            </div>
            <div className='flex p-3 space-x-3'>
              <button
                onClick={updateTask}
                className='w-full bg-cyan-500 text-white focus:outline-none rounded-md px-3 py-1'>
                SAVE
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
        <img
          src='edit.png'
          className={`w-5 h-5 hover:scale-105 transition-all ease-in-out duration-200 ${
            open && "opacity-0"
          }`}
          alt='edit'
        />
      </div>
    </>
  );
};
