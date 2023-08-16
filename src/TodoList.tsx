import React, { ChangeEvent, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";


import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

import "./App.css"
  interface item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [data, setData] = useState<item[]>([
    { id: 1, text: "Nekruz", completed: false },
    { id: 2, text: "Olim", completed: false },
  ]);

  const handleToggle = (id: number) => {
    setData(
      data.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  const deleteTodo = (id: number): void => {
    let ar = data.filter((todo) => {
      return todo.id != id;
    });
    setData(ar);
  };

  const [text,setText]=useState<string>("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setText(event.target.value);
  };
  






  const addTodo = () => {
    if (text.trim().length == 0) {
  return alert("Заполни текстом")
    }
    else {
          let obj = {
            id: new Date().getTime(),
            text: text,
            completed: false,
          };
          setData([...data, obj]);
          setText("");
    }
  }


  const [modal, setModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [idx, setIdx] = useState<number | null>(null)


  const handleModal = (todo:{id:number,text:string}) => {
    setIdx(todo.id)
    setTitle(todo.text)
    setModal(true)
  }

  const editTodo = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (title.trim().length == 0) {
     return alert("Не должно быть пустым")
    }
    else {
       let ar = data.map((e) => {
         if (idx === e.id) {
           e.text = title;
         }
         return e;
       });
       setData(ar);
       setModal(false);
    }
  }

  const handleEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className=" border-[1px] w-[500px] text-center text-white bg-violet-600 rounded-[20px] p-[40px] ml-[500px] mt-[20px]">
      <input
        className=" p-[10px] rounded-lg text-black"
        value={text}
        onChange={handleChange}
        type="text"
        placeholder="Добавить User"
      />
      <button
        type="button"
        className=" p-[10px] bg-green-500 ml-[10px] rounded-md"
        onClick={addTodo}
      >
        Add
      </button>
      {data.map((todo) => {
        return (
          <div key={todo.id}>
            <h1 className=" bg-slate-600 p-[10px] mt-[20px] rounded-2xl font-bold text-[20px]" style={{textDecoration: todo.completed ? "line-through" : "none",color: todo.completed ? "red" : "white",}}>{todo.text}</h1>
            <div className=" gap-[20px] flex justify-center">
              <button
                onClick={() => deleteTodo(todo.id)}
                className=" text-red-500"
              >
                <DeleteIcon />
              </button>
              <button
                
                onClick={() => handleToggle(todo.id)}
                className=" text-green-500"
              >
                <DoneIcon />
              </button>
              <button onClick={() => handleModal(todo)} className=" text-yellow-600">
                <EditIcon />
              </button>
            </div>
          </div>
        );
      })}

      {modal ? (
        <Dialog open={modal} aria-describedby="alert-dialog-slide-description">
          <DialogContent className=" justify-center flex">
            <form onSubmit={editTodo}>
              <input
                className=" border-[1px] border-black p-[10px] bg-slate-600 text-white text-[20px] rounded-[15px]"
                type="text"
                id=""
                value={title}
                placeholder="Onsubmit"
                onChange={handleEvent}
              />
              <button type="submit" className=" p-[10px] bg-green-500 ml-[10px] rounded-[15px]">Submit</button>
              <button className=" p-[10px] bg-red-500 ml-[10px] rounded-[15px]" onClick={()=>setModal(false)}>Cancel</button>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
};

export default TodoList;
