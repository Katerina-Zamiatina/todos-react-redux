import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { actions } from '../../redux/todos/todosReducer';
import TodoItem from '../TodoItem/TodoItem';
import Loader from '../Loader';

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(state => state.todos);

  const handleDelete = id => {
    dispatch(actions.deleteTodo({ id }));
  };

  return (
    <ul>
      {isLoading ? (
        <Loader />
      ) : (
        items?.map(({ id, title, completed }) => (
          <TodoItem
            key={uuidv4()}
            id={id}
            title={title}
            completed={completed}
            onDelete={() => handleDelete(id)}
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;
