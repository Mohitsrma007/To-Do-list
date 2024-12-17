import React, {useEffect, useState} from 'react'
import Task from './Task';


const Home = () => {
  const initialArr = localStorage.getItem("tasks")?
  JSON.parse(localStorage.getItem("tasks"))
  :[];
    const[tasks,setTasks] = useState(initialArr);
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const submitHandler = (e)=>{
      e.preventDefault();
      if(title.trim() === "" || description.trim() === ""){
        alert("Both Title and description are required");
        return;
      }
      setTasks([...tasks,{title,description},]);
      setTitle("");
      setDescription(""); 
    };
    const deletetask = (index)=>{
       const filteredArr = tasks.filter((val, i)=>{
            return i!== index; 
       });
       setTasks(filteredArr);
    };

    useEffect(()=>{
      localStorage.setItem("tasks",JSON.stringify(tasks));
    },[tasks]);
    

  return (
    <div className='container'>
        <h1>Daily Goals</h1>
        <form onSubmit={submitHandler}>
            <input type="text" 
            placeholder='Title'
            value={title}
            onChange={(e)=>(setTitle(e.target.value))}
            />
            <textarea 
            placeholder='Description'
            value={description}
            onChange={(e)=>(setDescription(e.target.value))}
            ></textarea>
            <button type='submit'>ADD</button>
        </form>

        {tasks.map((item,index)=>(
           <Task key={index} title={item.title}
            description={item.description}
            index = {index}
            deletetask = {deletetask}
            />
        ))}
        
    </div>
  );                                                         
}

export default Home