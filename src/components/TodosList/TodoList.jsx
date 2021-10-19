import { v4 as uuidv4 } from 'uuid';
import { actions } from '../../redux/todos/todosReducer';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TodoList.module.scss';
import Loader from '../Loader';

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(state => state.todos);

  const handleDelete = id => {
    dispatch(actions.deleteTodo({ id }));
  };

  const toggleCompleted = id => {
    dispatch(actions.updateTodo({ id }));
  };

  return (
    <ul>
      {isLoading ? (
        <Loader />
      ) : (
        items?.map(({ id, title, completed }) => (
          <li key={uuidv4()} className={styles.Todo_item}>
            <input
              type="checkbox"
              className={styles.Todo_checkbox}
              checked={completed}
              onChange={() => toggleCompleted(id)}
            />
            <p className={styles.Todo_text}>{title}</p>
            <button
              type="button"
              className={styles.Todo_button}
              onClick={() => handleDelete(id)}
            >
              Delete Todo
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
