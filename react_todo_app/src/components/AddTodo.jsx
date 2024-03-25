import { useState } from "react";



const AddTodo = ({addTodo}) => {

    // input state of a new todo 
    const [newTodo,setNewTodo]=useState("")

    // to handle text entered through input field
    const handleChange = (e)=>{
        setNewTodo(e.target.value)
    }

    const handleAddTodo = ()=>{
        addTodo(newTodo)
        setNewTodo("")
    }


    return (    
        <div className="addtodo" >
            <input  type="text" value={newTodo}  placeholder="Enter new todo here" onChange={(e)=>handleChange(e)} />
            <button onClick={()=>handleAddTodo()} >Add Todo</button>
        </div>
      );
}
 
export default AddTodo;