import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TodoItem from '../components/TodoItem';
import { API_URL } from '../config';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const { user, logout } = useAuth();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${API_URL}/todos`);
            setTodos(res.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        try {
            const res = await axios.post(`${API_URL}/todos`, { title: newTodo });
            setTodos([res.data, ...todos]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (id, updates) => {
        try {
            const res = await axios.put(`${API_URL}/todos/${id}`, updates);
            setTodos(todos.map((t) => (t.id === id ? res.data : t)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);
            setTodos(todos.filter((t) => t.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="container">
            <header className="header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="/Icon.png" alt="Todo App Logo" style={{ width: '40px', height: '40px' }} />
                    <h1>Welcome, {user?.name}</h1>
                </div>
                <button onClick={logout} className="btn-logout">Logout</button>
            </header>

            <form onSubmit={addTodo} className="todo-input-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="What needs to be done?"
                />
                <button type="submit" className="btn-add">Add</button>
            </form>

            <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;
