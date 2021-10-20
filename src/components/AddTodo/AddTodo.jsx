import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './AddTodo.module.scss';
import { addTodoAsync } from '../../redux/todos/todosOperations';

const AddTodo = () => {
  const [todo, setTodo] = useState({
    title: '',
    completed: false,
  });

  const dispatch = useDispatch();

  const handleChangeTodo = e => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(todo);
  };

  const onSubmit = todo => dispatch(addTodoAsync(todo));
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
