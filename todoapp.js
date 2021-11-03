(function () {

  function createAppTitle(title) {
    let todoAppTitle = document.createElement('h2');
    todoAppTitle.innerHTML = title;
    return todoAppTitle;
  };


  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';


    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
     return {
        form,
        input,
        button,
      };
  };


  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  };


  function createTodoItem(name) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');


    item.classList.add('list-group-item', 'd-flex', 'justify-content-betweet', 'align-items-center');

    item.textContent = name.name;

    if (name.done) {
      item.classList.toggle('list-group-item-success');
    };


    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton,
    }
};

function addClickListenerDone(todoItem,todoArr,itemObj,key) {
  todoItem.doneButton.addEventListener('click', function () {
    todoItem.item.classList.toggle('list-group-item-success');
        for (let i of todoArr) {
          if (i.name === itemObj.name) {
          i.done = ! itemObj.done;
          break;
        }
      }
    localStorage.setItem(key,JSON.stringify(todoArr));
  });
}

function addClickListenerDelete(todoItem,todoArr,itemObj,key) {
  todoItem.deleteButton.addEventListener('click', function () {
    if (confirm('Вы уверенны?')) {
           todoItem.item.remove();
           todoArr = todoArr.filter(function(el) {
             return el!==itemObj;
           });
               localStorage.setItem(key,JSON.stringify(todoArr));
    };
  });
};


  function createTodoApp(container, title = 'Список дел', todoArr, key) {


      if (localStorage.getItem(key) === null) {
        todoArr =[];
      } else {
        todoArr = JSON.parse(localStorage.getItem(key));
      };

      let todoAppTitle = createAppTitle(title);
      let todoItemForm = createTodoItemForm();
      let todoList = createTodoList();

      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);


    todoItemForm.form.addEventListener('submit', function (e) {
      todoItemForm.button.setAttribute('disabled', 'disabled')

      e.preventDefault();

      if(!todoItemForm.input.value) {
        return;
      };

      let itemObj = {};
      itemObj.name = todoItemForm.input.value;
      itemObj.done = false;
      todoArr.push(itemObj);
      localStorage.setItem('key', JSON.stringify(todoArr));
      console.log(todoArr);

      let todoItem = createTodoItem(itemObj);

      addClickListenerDone(todoItem,todoArr,itemObj,key);
      addClickListenerDelete(todoItem,todoArr,itemObj,key);
      todoList.append(todoItem.item);
      localStorage.setItem(key, JSON.stringify(todoArr));
      todoItemForm.input.value = '';
    });



    for (let itemObj of todoArr) {
      let todoItem = createTodoItem(itemObj);

      addClickListenerDone(todoItem,todoArr,itemObj,key);
      addClickListenerDelete(todoItem,todoArr,itemObj,key);
      todoList.append(todoItem.item);
    };


      todoItemForm.button.setAttribute('disabled', 'disabled');
      todoItemForm.input.addEventListener ('input', function () {
        if (todoItemForm.input.value !=='') {
          todoItemForm.button.removeAttribute('disabled');
        } else {
            todoItemForm.button.setAttribute('disabled', 'disabled');
        };
      });

  };

window.createTodoApp = createTodoApp;

})();
