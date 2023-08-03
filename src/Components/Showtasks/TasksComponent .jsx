import React, { useState } from 'react';
import useTasks from '../../UserHook/GetData/useTasks';
import { Link } from 'react-router-dom';

const TasksComponent = () => {
  const { data, isLoading, error } = useTasks();
  const [singleTask, setSingleTask] = useState({});

  if (isLoading) {
    return <div><span className="loading loading-bars loading-xs text-center"></span>
    <span className="loading loading-bars loading-sm"></span>
    <span className="loading loading-bars loading-md"></span>
    <span className="loading loading-bars loading-lg"></span></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
//   console.log(data[0]);

  const handleDelete = async (taskId) => {
    try {
      // Send the DELETE request to the server
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`https://myapp-six-liart.vercel.app/deletetask/${taskId}`, options);
      const data = await response.json();

      if (response.ok && data.message === 'Task deleted successfully') {
        console.log(data);
        alert('Task deleted successfully');
        // Optionally, you can also update the UI to remove the deleted task from the list
        // by filtering the data or fetching the updated data from the server.
      } else {
        console.log(data.error || 'Failed to delete task');
        // Handle error or show an error message to the user
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse">
          {/* head */}
          <thead>
            <tr className="text-black font-bold">
              <th className="py-2">#</th>
              <th className="py-2">Title</th>
              <th className="py-2">Description</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
              <th className="py-2">Action</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {data.map((task, index) => (
              <tr key={task._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">{task.date}</td>
                <td className="border px-4 py-2">
                  <Link to={`/update/${task._id}`}>
                   {
                        task?.status!='complete' ?  <button className='btn btn-sm bg-slate-700 text-white mt-2'>Update</button>:<p className='font-serif'>'Already task is completed '</p>
                   }
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  <button className='btn btn-sm bg-red-600 text-white mt-2' onClick={() => handleDelete(task._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksComponent;
