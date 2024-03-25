"use client"; // This is a client component 

import { useRef,useState,useEffect } from "react";
import TodoList from "@/app/components/TodoList";
import AddTodo from "@/app/components/AddTodo";
import styles from "./page.module.css";
import NavBar from "./components/NavBar";

const TodoRoute = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5200/todos");
          if (!response.ok) {
            console.error('Failed to fetch data');
          }
  
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  

    const listRef=useRef(null);
    
    // Create a new todo 
    const addTodo = (newTodo)=>{
        setTasks((prevTodos)=>[...prevTodos,{item:newTodo,completed:false}])
        setTimeout(()=>{
            listRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
        },0)
    }

    //handling Checkbox toggle for todo item
    const handleToggle = (id)=>{

        setTasks((prevTodos) =>
        prevTodos.map((todo,idx) =>
          idx === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

    }
    return ( 

      <div>
      <NavBar />
        <div className={styles.todoroute} >
            <label>Todo List</label>
            <AddTodo addTodo={addTodo} styles={styles} />
            <TodoList tasks={tasks} handleToggle={handleToggle} listRef={listRef} styles={styles}  />
        </div>
      </div>
     );
}
 
export default TodoRoute;