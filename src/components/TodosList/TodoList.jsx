import { v4 as uuidv4 } from 'uuid';
import { actions } from '../../redux/todos/todosReducer';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TodoList.module.scss';
import Loader from '../Loader';

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(state => state.todos);
  const handleDelete = todoId => {
    dispatch(actions.deleteTodo({ todoId }));
  };
  const toggleCompleted = todoId => {
    items.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );
  };

  return (
    <ul>
      {isLoading ? (
        <Loader />
      ) : (
        items.length &&
        items.map(({ id, title, completed }) => (
          <li key={uuidv4()} className={styles.Todo_item}>
            <input
              type="checkbox"
              className={styles.Todo_checkbox}
              checked={completed}
              onChange={() => toggleCompleted()}
            />
            <p className={styles.Todo_text}>{title}</p>
            <button
              type="button"
              className={styles.Todo_button}
              onClick={() => handleDelete()}
            >
              Delete Todo
            </button>
          </li>
        ))
      )}
    </ul>
    // <div>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    //     <table className={styles.table}>
    //       <thead>
    //         <tr>
    //           <th>Title</th>
    //           <th>Done</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {items.length &&
    //           items.map(({ id, title, completed }) => (
    //             <tr key={uuidv4()}>
    //               <td>{title}</td>
    //               <td>
    //                 <input
    //                   className={styles.chekbox}
    //                   type="checkbox"
    //                   checked={completed}
    //                   onChange={() => toggleCompleted(id)}
    //                 />
    //               </td>
    //               <td>
    //                 <button onClick={() => handleDelete(id)}>Delete</button>
    //               </td>
    //             </tr>
    //           ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
};

export default TodoList;
