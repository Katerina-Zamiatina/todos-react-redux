import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosAsync } from '../../redux/todos/todosOperations';
import AddTodo from '../AddTodo';
import TodoList from '../TodosList';
import styles from './TodosView.module.scss';

const TodosView = () => {
  const dispatch = useDispatch();

  const { items } = useSelector(store => store.todos);

  const getTodosFromApi = useCallback(() => dispatch(fetchTodosAsync()), [dispatch]);

  useEffect(() => {
    return localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <AddTodo />
      <button onClick={getTodosFromApi} className={styles.button}>
        Load Todos
      </button>
      <TodoList />
    </div>
  );
};

export default TodosView;
