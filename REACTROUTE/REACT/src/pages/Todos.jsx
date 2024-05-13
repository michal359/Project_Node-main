import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { serverRequests } from '../Api';


function Todos() {

  const UserData = useContext(UserContext);

  const [todosData, setTodosData] = useState([]);
  const [sortCriterion, setSortCriterion] = useState('default');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoContent, setEditedTodoContent] = useState('');

  useEffect(() => {
    if (UserData.id) {
      const fetchTodos = async () => {
        
        try {
          console.log("userId",UserData.id)
          serverRequests('GET', `todos?user_id=${UserData.id}`, null).then((todosArr) => {
            console.log(todosArr)
            setTodosData(todosArr);
            setFilteredTodos(todosArr);
          })
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
      fetchTodos();
    }
  }, [UserData.id]);

  const handleCheckboxChange = async (todoId) => {
    try {
      const toggleTodoComplete = (todo) => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo;
      setTodosData(todosData.map(toggleTodoComplete));
      setFilteredTodos(filteredTodos.map(toggleTodoComplete));

    const findTodo=todosData.find((todo) => todo.id === todoId) ;
    const todoToUpdate =
    { 
      id:todoId,
      user_id: UserData.id,
      title: findTodo.title,
      completed: !findTodo.completed }
      serverRequests('PUT', `todos/${todoId}`, todoToUpdate);

    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  useEffect(() => {
    switch (sortCriterion) {
      case 'id':
        setFilteredTodos([...todosData].sort((a, b) => a.id - b.id));
        break;
      case 'alphabet':
        setFilteredTodos([...todosData].sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'execution':
        setFilteredTodos([...todosData].sort((a, b) => a.completed - b.completed));
        break;
      case 'random':
        setFilteredTodos([...todosData].sort(() => Math.random() - 0.5));
        break;
      default:
        setFilteredTodos(todosData);
    }
  }, [sortCriterion]);

  const handleAddTodo = async () => {
    const todoToAdd = {
      user_id: UserData.id,
      title: newTodoTitle,
      completed: false,
    }
    try {
      console.log(todoToAdd)
      serverRequests('POST', 'todos', todoToAdd).then((newTodo) => {
        console.log(newTodo)
        setTodosData([...todosData, newTodo]);
        setFilteredTodos([...todosData, newTodo]);
        setNewTodoTitle('');
      })

    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    const todoToDelete = todosData.find((todo) => todo.id === todoId)
      
   
    try {
      serverRequests('DELETE', `todos/${todoId}`, todoToDelete).then(() => {
        const updatedTodos = todosData.filter((todo) => todo.id !== todoId);
        setTodosData(updatedTodos);
        setFilteredTodos(updatedTodos);
        setSearchTerm('');
      })

    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  const handleEditClick = (todoId, todoContent) => {
    setEditingTodoId(todoId);
    setEditedTodoContent(todoContent);
  };

  const handleSaveClick = async (todoId) => {
    const findTodo=todosData.find((todo) => todo.id === todoId) ;
    const todoToUpdate =
    { 
      id:todoId,
      user_id: UserData.id,
      title: editedTodoContent,
      completed: findTodo.completed }
    try {
      serverRequests('PUT', `todos/${todoId}`, todoToUpdate).then(() => {
        const updatedTodos = todosData.map((todo) =>
          todo.id === todoId ? { ...todo, title: editedTodoContent } : todo
        );
        setTodosData(updatedTodos);
        setFilteredTodos(updatedTodos);
        setEditingTodoId(null);
        setEditedTodoContent('');
        setSearchTerm('');
      })
    } catch (error) {
      console.error('Error updating todo content:', error);
    }
  }

  const searchHandle = (e) => {
    const updatedSearchTerm = e.target.value;
    setSearchTerm(updatedSearchTerm);

    if (updatedSearchTerm === '') {
      setFilteredTodos(todosData);
    } else {
      const filtered = todosData.filter((todo) =>
        todo.id.toString().includes(updatedSearchTerm) || todo.title.includes(updatedSearchTerm)
      );
      setFilteredTodos(filtered);
    }
  };

  const handleSearchByCompleted = () => {

    const complitedTodos = todosData.filter((todo) => todo.completed);
    setFilteredTodos(complitedTodos);
    setSearchTerm('');
  }


  const handleClearAll = async () => {

    const allTodos = [...todosData];
    setFilteredTodos(allTodos);
    setSearchTerm('');
  }

  return (
    <>
      <h1 className="todos-header">{UserData.username}'s Todos List 📝</h1>
      <div className='filterAndAddDiv'>
        <div className='filterSelect'>
          <label className="filterSelect" htmlFor="sortSelect">Filter by: </label>
          <select id="sortSelect" value={sortCriterion} onChange={(e) => setSortCriterion(e.target.value)}>
            <option value="default">Default</option>
            <option value="id">ID Order</option>
            <option value="alphabet">Alphabetical Order</option>
            <option value="execution">Execution Status</option>
            <option value="random">Random Order</option>
          </select>
        </div>

        <br />
        <div className="searchSection">
          <input
            type="text"
            id="newTodoInput"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter new todo title"
          />
          <button type="button" className="searchButton" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>

      <br />
      <div className='searchDiv'>
        <div className='searchSection'>
          <input
            type="text"
            placeholder="Search by ID or Title"
            value={searchTerm}
            onChange={searchHandle}
          />
        </div>
        <br />
        <div className="searchSection">
          <button type="button" className="searchButton" onClick={handleSearchByCompleted}>
            Search by Completed
          </button>
        </div>
        <br />
        <div className="searchSection">
          <button type="button" className="searchButton" onClick={handleClearAll}>
            Clear All Search
          </button>
        </div>
        <br />
      </div>
      <br />


      <div className="todos-list">
        {filteredTodos.length === 0 ?
          (<p>No matching todos found.</p>
          ) : ( 
            <>
              {filteredTodos.map((todo,key) => (
                <div key={key} className="todo-item">
                  <span className='left-content'>Id: {todo.id} </span>
                  {editingTodoId === todo.id ? (
                    <div className='left-content'>
                      <input
                        type="text"
                        value={editedTodoContent}
                        onChange={(e) => setEditedTodoContent(e.target.value)}
                      />
                      <button type="button" onClick={() => handleSaveClick(todo.id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className='left-content'>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleCheckboxChange(todo.id)}
                        />
                        <span className='left-content'>{todo.title}</span>
                      </div>
                      <div className='right-content'>
                        <button className='editBtn' type="button" onClick={() => handleEditClick(todo.id, todo.title)}>
                          ✏️
                        </button>
                        <button className='deleteBtn' type="button" onClick={() => handleDeleteTodo(todo.id)}>
                          ❌
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          )}

      </div>
    </>
  );

}

export default Todos;
