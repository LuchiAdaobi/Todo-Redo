// DOM SELECTORS
const clearEl = document.querySelector('.clear');
const dateEL = document.querySelector('#date');
const listEL = document.querySelector('#list');
const inputEL = document.querySelector('#input');

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
  element.parentNode.querySelector('.text').classList.toggle();

  LIST[element.id].done = !!LIST[element.id].done;
}

// REMOVE TODOS
function deleteTodo(element) {
  element.parentNode.parentNode.remove(element.parentNode);
  LIST[element.id].trash = true;
}

// EVENT LISTENS
listEL.addEventListener('click', (e) => {
  const element = e.target;
  const elementJob = element.attributes.job.value;

  
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
