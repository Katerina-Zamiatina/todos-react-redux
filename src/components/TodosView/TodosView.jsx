import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchTodos } from '../../redux/todos/todosOperations';
import { getTodos } from '../../redux/todos/todosSelectors';

const TodosView = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  const getTodosFromApi = useCallback(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div>
      <div onClick={getTodosFromApi}>get todos</div>
    </div>
  );
};

export default TodosView;
