import { useEffect,useState } from "react";
import axios from "axios";

function App(){
  const [todo, setTodo] = useState([]);
  const [newTask, setNewTask] = useState('');
  //useState ReactHook this RactHook's always use in fun level components only don't use in class level components.
  //To use useState Hook we want to use(or)assign one var&one fun. var is for to assign the value which is given by us and fun is for to change the value of first var.
  useEffect(() => {
    //if you want to run any fun after return then use useEffect(Hook) fun/method
    //useEffect fun/method will excute directly after the completeion of return to browser this is called life cycle.
    //useEffect return only once when we not give any dependency's
    //it will take two parameters one is function and second is dependency's.
   axios('http://localhost:9000/getDbData').then(
      //By using axios we can make an request to backend like an API call.
      arr => setTodo(arr.data)
    )
  },[])
  const subbmitHandler = e =>{
    //By using the preventDefault() we can stop the reloding of form(or)this will prevent all the default activies.
    //e.preventDefault();
    axios.post('http://localhost:9000/saveToDb', {var1todo: newTask}).then(
      arr => setTodo(arr.data)
    )

  }
  return (
    <div>
      <form onSubmit={subbmitHandler}>
        <input type="text" placeholder="todo" value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} />
        <input type="submit" />
      </form>

      {todo.map(task =>
      <div key={task._id}>
        {task.todo}
      </div>
      )}
    </div>
  );
}

export default App;