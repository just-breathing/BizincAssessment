import { useState,useEffect } from 'react';
import './App.css';
import TodoRoute from './Routes/TodoRoute';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <TodoRoute  tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
