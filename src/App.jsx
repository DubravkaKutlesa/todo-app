import { useEffect, useState } from 'react';
import axios from 'axios';
import Jumbo from './components/Jumbo';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import './App.css';


function App() {
	const [todoList, setTodoList] = useState([]);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		// GET Anfrage zum Laden von Daten vom Server
		axios
			.get('http://localhost:3001/todoList')
			.then((response) => {
				setTodoList(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
			});
	}, []);
	
	// Funktion, die Eingabetext akzeptiert
	const handleChange = (e) => {
		setNewTodo(e.target.value);
	};

	const addNewTodo = () => {
		if (newTodo !== '') {
			// POST Anfrage zum Hinzufügen einer neuen Aufgabe
			axios
				.post('http://localhost:3001/todoList', {
					todoName: newTodo,
					done: false,
				})
				.then((response) => {
					setTodoList([...todoList, response.data]);
					setNewTodo('');
				})
				.catch((error) => {
					console.error('Error adding todo: ', error);
				});
		}
	};

	const deleteTodo = (id) => {
		// DELETE Anfrage zum Löschen der Aufgabe
		axios
			.delete(`http://localhost:3001/todoList/${id}`)
			.then(() => {
				setTodoList(todoList.filter((todo) => todo.id !== id));
			})
			.catch((error) => {
				console.error('Error deleting todo: ', error);
			});
	};

	const markTodo = (index) => {
		const copyTodoList = [...todoList];
		copyTodoList[index].done = !copyTodoList[index].done;
		// PUT Update-Anfrage
		axios
			.put(
				`http://localhost:3001/todoList/${copyTodoList[index].id}`,
				copyTodoList[index]
			)
			.then(() => {
				setTodoList(copyTodoList);
			})
			.catch((error) => {
				console.error('Error updating todo: ', error);
			});
		return copyTodoList[index].done;
	};

	return (
		<div className='wrapp'>
			<Jumbo />
			<AddTodo
				handleChange={handleChange}
				addNewTodo={addNewTodo}
				newTodo={newTodo}
			/>

			<div className='container'>
				<div className='row'>
					{todoList.map((todo, index) => (
						<Todo
							key={todo.id}
							todoName={todo.todoName}
							index={index}
							deleteTodo={deleteTodo}
							id={todo.id}
							done={todo.done}
							markTodo={markTodo}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
