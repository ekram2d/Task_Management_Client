import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTasks from '../../UserHook/GetData/useTasks';

const Updatetask = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useTasks();
  const [singletask, setSingleTask] = useState({});
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter the data to find the task with the matching _id
    const filteredTask = data?.find((task) => task._id == id);
    console.log(filteredTask);

    // Set the filtered task into the singletask state
    setSingleTask(filteredTask);
  }, [data, id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedTask = {
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status'),
      date: formData.get('date'),
    };
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      };

      const response = await fetch(`https://myapp-six-liart.vercel.app/updatetask/${id}`, options);
      const data = await response.json();

      if (response.ok && data.message === 'Task updated successfully') {
        console.log(data);
        alert('Task updated successfully');
        navigate('/');
      } else {
        console.log(data.error || 'Failed to update task');
        // Handle error or show an error message to the user
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle the error appropriately
    }




    
    // Your form submission logic here
//     console.log(updatedTask);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/')
  };
//   console.log(singletask?.title);

  return (
    <div>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='modal-box w-full sm:w-[50%] max-h-max bg-slate-700'>
            <form onSubmit={onSubmit} className='p-4'>
              <label className='block text-center font-bold'>Title</label>
              <input
                className='p-2 m-2 rounded-lg bg-white text-black w-[90%]'
                defaultValue={singletask?.title || ''}
                name='title'
                required
              />
              <br />
              <label className='block text-center font-bold'>Description</label>
              <input
                className='p-2 m-2 rounded-lg bg-white text-black w-[90%]'
                defaultValue={singletask?.description || ''}
                name='description'
                required
              />
              <br />
              <label className='block text-center font-bold'>Status</label>
              <input
                className='p-2 m-2 rounded-lg bg-white text-black w-[90%]'
                defaultValue= 'complete'
                name='status'
              />
              <br />
              <label className='block text-center font-bold'>Date</label>
              <input
                className='p-2 m-2 rounded-lg bg-white text-black w-[90%]'
                defaultValue={singletask?.date || ''}
                type='date'
                name='date'
                required
              />
              <br />
              {/* Modal action buttons */}
              <div className='flex justify-center items-center'>
                <button
                  type='button'
                  onClick={handleModalClose}
                  className='btn btn-sm bg-red-700 mt-2 mr-2'
                >
                  Close
                </button>
                <button   type='submit' className='btn btn-sm bg-red-700 mt-2'>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Updatetask;
