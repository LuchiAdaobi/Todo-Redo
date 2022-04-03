// DOM SELECTORS
const clearEl = document.querySelector('.clear');
const dateEL = document.querySelector('#date');
const listEL = document.querySelector('#list');
const inputEL = document.querySelector('#input');
const filterOptions = document.querySelector('.filter-todo');

// CLASSES
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle';
const LINE_THROUGH = 'lineThrough';

// DATE
const dateFormat = {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
};

const today = new Date();

dateEL.innerHTML = today.toLocaleDateString('en-US', dateFormat);

// ADD TODO
function addTodo(todo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : '';

  const position = 'beforeend';
  const item = `
  <li class ='item'>
  <i class='far ${DONE} co' job='complete' id='${id}'></i>
  <p class='text ${LINE}'> ${todo} </p>
  <i class ='fa-solid fa-trash-can de' job ='delete' id ='${id}'> </i>
  </li>
  `;

  listEL.insertAdjacentHTML(position, item);
}

// LOCAL STORAGE
// variables

let LIST = [];
let id = 0;

const data = localStorage.getItem('TODO');

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

// load item to user Interface
function loadList(array) {
  array.forEach((item) => {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

// COMPLETED TODO
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

  LIST[element.id].done = !!LIST[element.id].done;
  localStorage.setItem('TODO', LIST);
}

// REMOVE TODOS
function deleteTodo(element) {
  element.parentNode.remove(element.parentNode);
  LIST[element.id].trash = true;
}

// EVENT LISTENS
// dynamically created content
listEL.addEventListener('click', (e) => {
  const element = e.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'complete') {
    completeTodo(element);
  } else if (elementJob === 'delete') {
    deleteTodo(element);
  }
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

inputEL.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const todo = inputEL.value;

    // if the input isn't empty
    if (todo) {
      addTodo(todo, id, false, false);
      LIST.push({
        name: todo,
        id,
        done: false,
        trash: false,
      });
      //   update local storage
      localStorage.setItem('TODO', JSON.stringify(LIST));

      id += 1;
    }
    inputEL.value = '';
  }
});

// CLEAR TODO
clearEl.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

// FILTER TODOS

function filterTodos(e) {
  //  select all the items
  const todos = listEL.querySelectorAll('.item');
  todos.forEach((todo) => {
    const iconChecked = todo
      .querySelector('i')
      .classList.contains('fa-check-circle');

    switch (e.target.value) {
      case 'all':
        todo.style.display = 'block';
        break;

      case 'completed':
        if (iconChecked) {
          todo.style.display = 'block';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!iconChecked) {
          todo.style.display = 'block';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

filterOptions.addEventListener('click', filterTodos);
