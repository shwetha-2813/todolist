// Initialize the to-do list and counters
let todos = [];
let completedTodos = 0;
let totalTodos = 0;

// Function to add a new todo
const addTodo = (todoText) => {
    const todo = {
        text: todoText,
        completed: false
    };
    todos.push(todo);
    totalTodos++;
    renderTodos(todos);
    updateCounts();
};

// Function to render todos based on the current list
const renderTodos = (todosList) => {
    const todoList = document.getElementById('all-todos');
    todoList.innerHTML = ''; // Clear the list before rendering

    todosList.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        
        // Create the to-do text element
        const todoText = document.createElement('span');
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);
        
        // Create the action buttons (Complete, Delete)
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('todo-actions');

        // Complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleComplete(index));
        actionsDiv.appendChild(completeButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(index));
        actionsDiv.appendChild(deleteButton);

        todoItem.appendChild(actionsDiv);
        todoList.appendChild(todoItem);

        // Style the completed tasks
        if (todo.completed) {
            todoText.style.textDecoration = 'line-through';
            todoText.style.color = 'gray';
        }
    });
};

// Function to toggle the completion status of a todo
const toggleComplete = (index) => {
    todos[index].completed = !todos[index].completed;
    todos[index].completed ? completedTodos++ : completedTodos--;
    renderTodos(todos);
    updateCounts();
};

// Function to delete a todo
const deleteTodo = (index) => {
    if (todos[index].completed) {
        completedTodos--;
    }
    todos.splice(index, 1);
    totalTodos--;
    renderTodos(todos);
    updateCounts();
};

// Function to update the task counts (completed and total)
const updateCounts = () => {
    document.getElementById('c-count').textContent = completedTodos;
    document.getElementById('r-count').textContent = totalTodos;
};

// Filter Functions
const viewAll = () => {
    renderTodos(todos);
};

const viewRemaining = () => {
    const remainingTodos = todos.filter(todo => !todo.completed);
    renderTodos(remainingTodos);
};

const viewCompleted = () => {
    const completedTodosList = todos.filter(todo => todo.completed);
    renderTodos(completedTodosList);
};

// Add button functionality
document.getElementById('add-button').addEventListener('click', () => {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    
    if (todoText !== "") {
        addTodo(todoText);
        todoInput.value = ''; // Clear input field
    }
});

// Due date selection toggle (optional if needed for extended functionality)
document.getElementById('due-date-select').addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    const dateInput = document.getElementById('due-date-input');
    
    if (selectedValue === 'add-date') {
        dateInput.style.display = 'block';
    } else {
        dateInput.style.display = 'none';
    }
});

// Filter functionality
document.getElementById('filter-todos').addEventListener('change', (e) => {
    const filterValue = e.target.value;
    if (filterValue === 'all') {
        viewAll();
    } else if (filterValue === 'rem') {
        viewRemaining();
    } else if (filterValue === 'com') {
        viewCompleted();
    }
});

// Delete all todos functionality
document.getElementById('delete-all').addEventListener('click', () => {
    todos = [];
    completedTodos = 0;
    totalTodos = 0;
    renderTodos(todos);
    updateCounts();
});

// Delete selected (completed) todos
document.getElementById('delete-selected').addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    completedTodos = 0;
    totalTodos = todos.length;
    renderTodos(todos);
    updateCounts();
});
