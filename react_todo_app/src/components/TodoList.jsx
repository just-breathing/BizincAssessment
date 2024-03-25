


const TodoList = ({tasks,handleToggle,listRef}) => {

    const handletoggle=(idx)=>{
            handleToggle(idx)
    }


    return ( 
        <div className="TodoList"  ref={listRef}>
            {
                tasks.map((task,idx)=>{
                    return (
                        <div className={`todoitem ${task.completed===true?"completed":"not-completed"}`} key={idx} >
                            <input type="checkbox" checked={task.completed} onChange={()=>handletoggle(idx)} />
                            <p>{task.item}</p>
                        </div>
                    )
                })
            }

        </div>
   

    
    );
}
 
export default TodoList;