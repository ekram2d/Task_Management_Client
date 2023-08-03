import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import TasksComponent from '../../Showtasks/TasksComponent ';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();
  // State to handle the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data?.title,
        description: data?.description,
        status: data?.status,
        date: data?.date,
      }),
    };
    fetch('https://myapp-six-liart.vercel.app/addtask', options)
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          console.log(data);
          alert('Added new task successfully');
          setShowModal(false)
        }
      })
      .catch((err) => console.log(err));

    console.log(data);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-3xl'>Task List</h1>
        <button className='btn btn-sm bg-slate-600 p-2 m-2 text-white font-bold' onClick={handleModalOpen}>
          Add new
        </button>
      </div>


      <TasksComponent></TasksComponent>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='modal-box w-full sm:w-[50%] max-h-max bg-slate-700'>
            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
              <label className='block text-center font-bold'>Title</label>
              <input className='p-2 m-2 rounded-lg bg-white text-black w-[90%]' defaultValue='' {...register('title')} required />
              <br />
              <label className='block text-center font-bold'>Description</label>
              <input className='p-2 m-2 rounded-lg bg-white text-black w-[90%]' defaultValue='' {...register('description')} required/>
              <br />
              <label className='block text-center font-bold'>Status</label>
              <input className='p-2 m-2 rounded-lg bg-white text-black w-[90%]' defaultValue='pending' {...register('status')} />
              <br />
              <label className='block text-center font-bold'>Date</label>
              <input type='date' className='p-2 m-2 rounded-lg bg-white text-black w-[90%]' defaultValue='' {...register('date')} required/>
              <br />
              {/* Modal action buttons */}
              <div className='flex justify-center items-center'>
                <button type='button' onClick={handleModalClose} className='btn btn-sm bg-red-700 mt-2 mr-2'>
                  Close
                </button>
                <button type='submit' className='btn btn-sm bg-red-700 mt-2'>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
