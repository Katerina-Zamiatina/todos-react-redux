import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { actions } from '../../redux/todos/todosReducer';
import styles from './AddTodo.module.scss';

const AddTodo = () => {
  const [todo, setTodo] = useState({
    id: uuidv4(),
    title: '',
    completed: false,
  });

  const dispatch = useDispatch();
  const onSubmit = todo => dispatch(actions.addTodo(todo));
  const handleChangeTodo = e =>
    setTodo({ ...todo, [e.target.name]: e.target.value });
  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(todo);
  };
  return (
    <form className={styles.Todo_form} onSubmit={handleFormSubmit}>
      <input
        className={styles.Todo_input}
        type="text"
        name="title"
        placeholder="Enter todo"
        value={todo.title}
        onChange={handleChangeTodo}
        required
      />

      <button type="submit" className={styles.Todo_button}>
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
