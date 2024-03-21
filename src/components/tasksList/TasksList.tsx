import { memo, useCallback } from "react";
import { TaskType } from "../list/TodoList";
import TaskItem from "../taskItem/taskItem";
import { useDispatch } from "react-redux";
import * as taskAc from '../../state/tasks/actions';

type TasksListPropsType = {
  listId: string;
  tasks: Array<TaskType>;
};

function TasksList({listId, tasks}: TasksListPropsType) {
  const dispatch = useDispatch();

  const callbacks = {
    changeTaskStatus: useCallback((taskId: string, value: boolean) => {
      dispatch(taskAc.changeStatusAC(listId, taskId, value));
    }, [dispatch, listId]),
    changeTaskTitle: useCallback((taskId: string, value: string) => {
      dispatch(taskAc.changeTaskTitleAC(listId, taskId, value));
    }, [dispatch, listId]),
    removeTask: useCallback((taskId: string) => {
      dispatch(taskAc.removeTaskAC(listId, taskId));
    }, [dispatch, listId])
  }

  return (
    <div style={{marginTop: "10px", marginBottom: "10px"}}>
      {tasks?.length > 0 ? (
        tasks.map((item) => <TaskItem key={item.id} listId={listId} item={item}
                                      changeStatus={callbacks.changeTaskStatus}
                                      changeTitle={callbacks.changeTaskTitle}
                                      removeTask={callbacks.removeTask} />)
      ) : (
        <div style={{marginTop: "15px", marginBottom: "15px"}}>Нет добавленных задач</div>
      )}
    </div>
  );
}

export default memo(TasksList);
