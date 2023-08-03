// useTasks.js
import axios from 'axios';
import { useQuery } from 'react-query';

const useTasks = () => {
  return useQuery('tasks', fetchTasks);

  async function fetchTasks() {
    const response = await axios.get('https://myapp-six-liart.vercel.app/gettask');
    return response.data; // Assuming the server returns an array of tasks
  }
};

export default useTasks;
