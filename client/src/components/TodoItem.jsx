import { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handleUpdate = () => {
        onUpdate(todo.id, { title, completed: todo.completed });
        setIsEditing(false);
    };

    const toggleComplete = () => {
        onUpdate(todo.id, { title: todo.title, completed: !todo.completed });
    };

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleComplete}
                className="todo-checkbox"
            />
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="edit-input"
                        autoFocus
                    />
                    <div className="todo-actions">
                        <button onClick={handleUpdate} className="btn-icon" title="Save">✓</button>
                        <button onClick={() => setIsEditing(false)} className="btn-icon" title="Cancel">✕</button>
                    </div>
                </>
            ) : (
                <>
                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.title}
                    </span>
                    <div className="todo-actions">
                        <button onClick={() => setIsEditing(true)} className="btn-icon" title="Edit">✎</button>
                        <button onClick={() => onDelete(todo.id)} className="btn-icon btn-delete" title="Delete">🗑</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
