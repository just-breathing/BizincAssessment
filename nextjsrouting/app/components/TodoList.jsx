


const TodoList = ({tasks,handleToggle,listRef,styles}) => {

    const handletoggle=(idx)=>{
            handleToggle(idx)
    }


    return ( 
        <div className={styles.TodoList}  ref={listRef}>
            {
                tasks.map((task,idx)=>{
                    return (
                        <div className={`${styles.todoitem} ${task.completed ? styles.completed : styles['not-completed']}`}
                        key={idx} >
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