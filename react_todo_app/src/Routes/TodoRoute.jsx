import { useRef } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import "../Layouts/todoroute.css"


const TodoRoute = ({tasks,setTasks}) => {
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
        <div className="todoroute" >
            <label>Todo List</label>
            <AddTodo addTodo={addTodo} />
            <TodoList tasks={tasks} handleToggle={handleToggle} listRef={listRef} />
        </div>
     );
}
 
export default TodoRoute;