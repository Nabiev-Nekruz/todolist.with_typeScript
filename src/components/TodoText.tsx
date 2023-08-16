import { ITask } from '../interfaces'
import DeleteIcon from "@mui/icons-material/Delete";
interface Props {
    
  text?: ITask;
  completeTask(taskNameToDelete:string):void
}

const TodoText = ({text, completeTask}:Props) => {
  return (
    <div>
      <div className=" ">
        <div className="l bg-violet-600 rounded-[15px]">
          <p className="">{text?.taskName}</p>
        </div>
        <div className=" h">
          <button
            onClick={() => {
              completeTask(text?.taskName);
            }}
            className=' text-red-600'
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoText