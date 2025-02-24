/**
 *  This file is a component for rendering and managing tasks, including fetching tasks from the API and handling task creation.
 * 
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Task.css';
interface Task {
  id: number;
  title: string;
  // Optional description
  description?: string;
  isComplete: boolean;
}

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState('');

  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by verifying the token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to the login page if no token is found
      navigate('/login');
      return;
    }

    // If token exists, fetch tasks
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        setError('Failed to load tasks');
        console.error(err);
      }
    };

    fetchTasks();
  }, [navigate]);

  return (
    <div className = "tasks-container">
      <div className = "tasks-box">
      <h2>Your Tasks</h2>
      {error && <div className="error-message">{error}</div>}

      {/* Form to create a new task */}
      <form id= "mainForum"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await api.post('/tasks', {
              title: newTitle,
              description: newDescription,
            });
            setTasks([...tasks, response.data]);
            setNewTitle('');
            setNewDescription('');
          } catch (err) {
            setError('Failed to create task');
            console.error(err);
          }
        }}
      >
        <div>
          <label className='labelInputs'>Title:   </label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='labelInputs'>Description:</label>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>

      {/* Display the list of tasks */}
      <ul className = "task-list" >
        {tasks.map((task) => (
          <li key={task.id} className= "task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</p>
            <button
              onClick={async () => {
                try {
                  const response = await api.put(`/tasks/${task.id}`, {
                    isComplete: !task.isComplete,
                    title: task.title,
                    description: task.description,
                  });
                  console.log('Response data:', response.data);
                  setTasks(
                    tasks.map((t) =>
                      t.id === task.id ? response.data : t
                    )
                  );
                } catch (err) {
                  setError('Failed to update task');
                  console.error(err);
                }
              }}
            >
              Mark as {task.isComplete ? 'Incomplete' : 'Complete'}
            </button>
            <button
              onClick={async () => {
                try {
                  await api.delete(`/tasks/${task.id}`);
                  setTasks(tasks.filter((t) => t.id !== task.id));
                } catch (err) {
                  setError('Failed to delete task');
                  console.error(err);
                }
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className = "links">
        <Link to="/login">Login</Link>
      </div>
      </div>
    </div>
  );
};

export default Tasks;
