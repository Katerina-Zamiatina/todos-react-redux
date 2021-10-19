import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux';

import { fetchTodos, actions } from '../../redux/todos/todosReducer';

const TodosView = () => {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(store => store.todos);

  const getTodosFromApi = useCallback(
    () => !items.length && dispatch(fetchTodos()),
    [],
  );

  useEffect(() => {
    return localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  const addTodo = ({ title }) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    actions.addTodo(newTodo);
  };

  console.log(' TODOVIEW', items);
  return (
    <div>
      <div onClick={getTodosFromApi}>get todos</div>
    </div>
  );
};

export default TodosView;
