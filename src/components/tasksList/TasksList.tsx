import { memo } from "react";
import { TaskType } from "../list/TodoList";
import TaskItem from "../taskItem/taskItem";

type TasksListPropsType = {
  listId: string;
  tasks: Array<TaskType>;
};

function TasksList({listId, tasks}: TasksListPropsType) {
  return (
    <div style={{marginTop: "10px", marginBottom: "10px"}}>
      {tasks?.length > 0 ? (
        tasks.map((item) => <TaskItem key={item.id} listId={listId} item={item} />)
      ) : (
        <div style={{marginTop: "15px", marginBottom: "15px"}}>Нет добавленных задач</div>
      )}
    </div>
  );
}

export default memo(TasksList);
