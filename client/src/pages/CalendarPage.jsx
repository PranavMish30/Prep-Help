import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import dataService from '../api/dataService';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Fetch Events
      const eventsData = await dataService.getEvents();
      
      // Map event dates to Date objects required by react-big-calendar
      const formattedEvents = eventsData.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        title: event.title,
      }));
      setEvents(formattedEvents);

      // 2. Fetch Tasks (for the To-Do list view/integration)
      const tasksData = await dataService.getTasks();
      setTasks(tasksData);

      setLoading(false);

    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to load data. Please log in again.');
      setLoading(false);
    }
  };

  // Function to convert tasks into calendar events (optional visual aid)
  const taskToEvent = tasks
    .filter(task => task.dueDate && !task.isCompleted)
    .map(task => ({
      title: `[TASK] ${task.title}`,
      start: new Date(task.dueDate),
      end: moment(task.dueDate).add(1, 'hour').toDate(),
      allDay: true,
      resource: { type: 'TASK' }
    }));

  if (loading) return <div>Loading Schedule...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div className="calendar-page-container">
      <h1>📅 Study Planner</h1>
      <div style={{ height: 600, marginBottom: '30px' }}>
        <Calendar
          localizer={localizer}
          events={[...events, ...taskToEvent]} // Combine official events and due tasks
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '20px' }}
        />
      </div>

      {/* Placeholder for the To-Do List component */}
      <div className="todo-list-section">
        <h2>✅ Active To-Do List ({tasks.filter(t => !t.isCompleted).length})</h2>
        {/* We will build the actual ToDoList component in the next step */}
        <ul>
          {tasks.filter(t => !t.isCompleted).map(task => (
            <li key={task._id}>
              **{task.title}** {task.dueDate ? ` (Due: ${moment(task.dueDate).format('MMM D')})` : ''}
              <button>Complete</button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Placeholder for Task/Event creation forms */}
      <p>Add Task/Event forms go here...</p>
    </div>
  );
};

export default CalendarPage;