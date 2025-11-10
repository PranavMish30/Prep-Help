import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

// Helper function to get the token from localStorage
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  } : {};
};

// --- TASK API Calls ---

const getTasks = async () => {
  const response = await axios.get(BASE_URL + 'tasks', getAuthHeaders());
  return response.data;
};

const createTask = async (taskData) => {
  const response = await axios.post(BASE_URL + 'tasks', taskData, getAuthHeaders());
  return response.data;
};

const updateTask = async (id, taskData) => {
  const response = await axios.put(BASE_URL + `tasks/${id}`, taskData, getAuthHeaders());
  return response.data;
};

const deleteTask = async (id) => {
  const response = await axios.delete(BASE_URL + `tasks/${id}`, getAuthHeaders());
  return response.data;
};


// --- EVENT API Calls ---

const getEvents = async () => {
  const response = await axios.get(BASE_URL + 'events', getAuthHeaders());
  return response.data;
};

const createEvent = async (eventData) => {
  const response = await axios.post(BASE_URL + 'events', eventData, getAuthHeaders());
  return response.data;
};

const updateEvent = async (id, eventData) => {
  const response = await axios.put(BASE_URL + `events/${id}`, eventData, getAuthHeaders());
  return response.data;
};

const deleteEvent = async (id) => {
  const response = await axios.delete(BASE_URL + `events/${id}`, getAuthHeaders());
  return response.data;
};

const dataService = {
  getTasks, createTask, updateTask, deleteTask,
  getEvents, createEvent, updateEvent, deleteEvent,
};

export default dataService;