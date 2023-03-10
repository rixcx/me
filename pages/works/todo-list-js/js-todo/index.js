const form = document.getElementById("form");
const input = document.getElementById("input");
const add = document.getElementById("add");
const reset = document.getElementById("reset");
const ul = document.getElementById("ul");
let noTodo = "";

let saveTodos = JSON.parse(localStorage.getItem("saveTodos"));

const noTodoHtml = `<div id="noTodo" class="mt-5 mb-5 row justify-content-center">
  <img src="img/noTodo.png" alt="noTodo" class="col-md-6 col-10">
</div>`;

if (saveTodos) {
  saveTodos.forEach(saveTodo => {
    addData(saveTodo.text,saveTodo.done);
  });
} else {
  ul.insertAdjacentHTML('afterbegin', noTodoHtml);
  noTodo = document.getElementById("noTodo");
};

form.addEventListener("submit",
  function(event) {
    event.preventDefault(); 
    addData();
  }
);

add.addEventListener("submit",
  function(event) {
    event.preventDefault();
    addData();
  }
);

function addData(saveTodo,done) {
  let todoText = input.value;
  
  if (saveTodo) {
    todoText = saveTodo;
  }
  
  if (todoText) {
    const li = document.createElement("li");
    li.classList.add("list-group-item","d-flex","justify-content-between");
    ul.appendChild(li);
  
    const checkBox = document.createElement("div");
    checkBox.classList.add("form-check");
    li.appendChild(checkBox);

    const trashicon = document.createElement("i");
    trashicon.classList.add("bi","bi-trash-fill");
    trashicon.setAttribute("style","font-size: 1rem; color: rgba(0,0,0,.5)");
    trashicon.setAttribute("onclick","trash(this);")
    li.appendChild(trashicon);

    const checkInput = document.createElement("input");
    checkInput.classList.add("form-check-input");
    checkInput.setAttribute("type","checkbox")
    checkInput.setAttribute("name","todo");
    checkInput.setAttribute("id",todoText);
    checkInput.setAttribute("onchange","check(this);");
    if (done) {
        checkInput.checked = true;
    };
    checkBox.appendChild(checkInput);
    
    const checkLabel = document.createElement("label");
    checkLabel.classList.add("form-check-label");
    if (done) {
        checkLabel.classList.add("text-black-50");
    };
    checkLabel.setAttribute("for",todoText);
    checkLabel.innerText = todoText;
    checkBox.appendChild(checkLabel);

    input.value = "";
    saveData();

    if (noTodo) {
      noTodo.remove();
    }
  }
};

function saveData() {
  const lists = Array.from(document.getElementsByClassName('list-group-item'));

  let array = [];
  lists.forEach( list => {
    let obj = {
      "text":list.innerText,
      "done":list.querySelector('input').checked,
    };
    array.push(obj);
  });
  localStorage.setItem("saveTodos", JSON.stringify(array));
  saveTodos = JSON.parse(localStorage.getItem("saveTodos"));
};

function check(current) {
  const lists = Array.from(document.getElementsByClassName('list-group-item'));
  const currentLi = current.parentElement.parentElement;
  const idx = lists.indexOf(currentLi);

  if (current.checked) { 
    current.nextElementSibling.classList.add("text-black-50");
    saveTodos[idx].done = true;
    localStorage.setItem("saveTodos", JSON.stringify(saveTodos));
  } else {
    current.nextElementSibling.classList.remove("text-black-50");
    saveTodos[idx].done = false;
    localStorage.setItem("saveTodos", JSON.stringify(saveTodos));
  }
};

function trash(current) {
  const liList = Array.from(document.getElementsByClassName('list-group-item'));
  const currentLi = current.parentElement;
  const idx = liList.indexOf(currentLi);

  saveTodos.splice(idx,1);
  localStorage.setItem("saveTodos", JSON.stringify(saveTodos));

  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  };
  
  saveTodos.forEach(saveTodo => {
    addData(saveTodo.text,saveTodo.done);
  })

  if (saveTodos.length === 0) {
    localStorage.removeItem("saveTodos");
    ul.insertAdjacentHTML('afterbegin', noTodoHtml);
    noTodo = document.getElementById("noTodo");
  }
};

reset.onclick = function() {
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  };
  localStorage.removeItem("saveTodos");
  ul.insertAdjacentHTML('afterbegin', noTodoHtml);
  noTodo = document.getElementById("noTodo");
};
