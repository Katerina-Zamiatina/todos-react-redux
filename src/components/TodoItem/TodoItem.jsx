import React from 'react';

import { useDispatch } from 'react-redux';
import { actions } from '../../redux/todos/todosReducer';
import styles from '../TodosList/TodoList.module.scss';

const TodoItem = ({ id, title, completed, onDelete }) => {
  const dispatch = useDispatch();

  const handleCompleted = e => {
    e.preventDefault();
    dispatch(
      actions.updateTodo({
        id,
        completed: !completed,
      }),
    );
  };

  return (
    <li  className={styles.Todo_item}>
      <input
        type="checkbox"
        className={styles.Todo_checkbox}
        checked={completed}
        onChange={handleCompleted}
      />
      <p className={styles.Todo_text}>{title}</p>
      <button type="button" className={styles.Todo_button} onClick={onDelete}>
        Delete Todo
      </button>
    </li>
  );
};

export default TodoItem;
