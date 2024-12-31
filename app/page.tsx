"use client";
import { Check, Trash, X } from "lucide-react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

interface Task {
  completed: boolean;
  text: string | undefined;
}

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [uncheck, setUncheck] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log(tasks);


  const handleAddTotasks = () => {
    const text = inputRef.current?.value;
    if (text) {
      const newItem = { completed: false, text }
      setTasks((prevTasks) => [...prevTasks, newItem]); // Functional update to ensure correct state update
      toast.success("The task added")

      if (inputRef.current) {
        inputRef.current.value = ""; // Clear input after adding task
      }
    }
  }

  const handleItemDone = (index: number) => {
    if (uncheck == true) {
      return null
    } else {
      const newTodos = [...tasks];
      newTodos[index].completed = !newTodos[index].completed
      setTasks(newTodos)
      toast.success("Good Job.")
    }
  }

  const handleItemDelete = (index: number) => {
    const newTodos = [...tasks];
    newTodos.splice(index, 1);
    setTasks(newTodos)
    toast.success("The task removed")
  }

  const handleItemUnCheck = (index: number) => {
    if (tasks[index].completed == false) {
      setUncheck(true)
      toast.success("You can do it another time")
    } else {
      return null;
    }
  }

  return (
    <div>
      <ToastContainer />
      <h1 className="font-medium text-black text-5xl text-center mt-16">Todolist</h1>

      <div className="bg-white p-[20px] w-[620px] max-sm:w-[420px] ml-auto mr-auto mt-12 rounded-full">
        <div className="flex items-center justify-center gap-2 w-[500px] max-sm:w-[350px] p-[12px] bg-[#f0f0f0] rounded-full ml-auto mr-auto">
          <input ref={inputRef} className="outline-none border-none w-[500px] max-sm:w-[350px] p-[8px] max-sm:p-[10px] text-[15px] transition-all duration-200 ease-out rounded-full text-black" placeholder="Todolist..." type="text" />
          <button onClick={handleAddTotasks} className="p-[8px] w-[50px] max-sm:p-[10px]  text-lg cursor-pointer  font-medium rounded-full text-center bg-white text-black ">+</button>
        </div>
      </div>

      <div className="bg-white p-[20px] w-[620px] max-sm:w-[420px] ml-auto mr-auto mt-14 rounded-xl">
        <p className="text-sm pl-9 max-sm:pl-[6px] text-gray-400">Your Tasks</p>

        {tasks.length === 0 ?
          <p className="text-gray-600 text-center">Not Found Anything</p>
          :
          tasks.map((item, index) => {
            return <div key={index}>
              <div className="p-[15px] rounded-full mt-2 flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <button onClick={() => handleItemDone(index)} className="flex items-center justify-center text-center drop-shadow-lg bg-[#f0f0f0] p-[8px] rounded-full text-green-500 cursor-pointer hover:transition-all hover:duration-200 hover:ease-in-out hover:bg-[#f1f1ff]"><Check size={18} /></button>
                  <button onClick={() => handleItemUnCheck(index)} className="flex items-center justify-center text-center drop-shadow-lg bg-[#f0f0f0] p-[8px] rounded-full text-red-500 cursor-pointer hover:transition-all hover:duration-200 hover:ease-in-out hover:bg-[#f1f1ff]"><X size={18} /></button>
                </div>

                <p className={`font-medium ${item.completed ? "line-through transition-all ease-in duration-300" : null} ${uncheck ? "overline transition-all ease-in duration-300" : null}`}>{item.text}</p>

                <p onClick={() => handleItemDelete(index)} className="flex items-center border-none outline-none justify-center text-center drop-shadow-lg bg-[#f0f0f0] p-[8px] rounded-full text-black cursor-pointer hover:transition-all hover:duration-200 hover:ease-in-out hover:bg-[#f1f1ff]">
                  <Trash size={20} />
                </p>
              </div>
              <hr className="bg-gray-700 w-[500px] max-sm:w-[255px] ml-auto mr-auto drop-shadow-sm" />
            </div>
          })
        }

      </div>
    </div>
  );
}
