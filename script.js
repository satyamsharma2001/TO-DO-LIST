const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;
let todos = [];
// if (localStorage.getItem("todos")) {
//   //   const x = localStorage.getItem("todos");
// }

addBtn.addEventListener(
  "click",
  (addtodo = () => {
    const inputtext = inputBox.value.trim();
    // console.log(inputtext);
    // ------>this is for using does not enter the anything in input box<--------
    if (inputtext.length <= 0) {
      alert("Enter The SomeThing");
      return false;
    }

    // ----->create the li which show on the screen after the click on add button <--------
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputtext;
    li.appendChild(p);
    // --------> create the logic in click on edit button edits the input text message then edit the message show on the pervious todo list <-------------
    // --------> else target help to remove the extra generateing feild after the edit inputtext <----------
    if (addBtn.value === "Edit") {
      const prevValue = editTodo.target.previousElementSibling.innerHTML;
      editTodo.target.previousElementSibling.innerHTML = inputtext;
      editLoaclTodos(inputtext, prevValue);
      addBtn.value = "Add";
      inputBox.value = "";
    } else {
      // ----->create the Edit button in li after click on add button<-------
      const editBtn = document.createElement("button");
      //   editLoaclTodos(inputtext);
      editBtn.innerText = "Edit";
      editBtn.classList.add("Btn", "edit");
      li.appendChild(editBtn);

      // ----->create the delete button in li after click on add button<-------
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("Btn", "delete");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
      inputBox.value = "";
      saveLocaltodo(inputtext);
    }
  })
);
const updateTodo = (e) => {
  //   console.log(e.target.innerHTML);
  if (e.target.innerHTML === "Remove") {
    // console.log(e.target.parentElement);
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    // deleteLocalTodos(e.target.previousElementSibling.innerHTML);
    // console.log(deleteLocalTodos);
    // ------> click on the edit button in todolist cursor show i=on the inputtext feild (inputBox.focus)<------
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};
todoList.addEventListener("click", updateTodo);
const saveLocaltodo = (i) => {
  todos.push(i);
  localStorage.setItem("todos", JSON.stringify(todos));
  //   console.log(localStorage.getItem("todos"));
  //   todos = JSON.parse(localStorage.getItem("todos "));
  //   console.log(JSON.parse(localStorage.getItem("todos")));
};

const getLocaltodo = () => {
  //   console.log("get Local Todo ");
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    const x = localStorage.getItem("todos");
    todos = JSON.parse(x);
    todos.forEach((item) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = item;
      li.appendChild(p);
      // --------> create the logic in click on edit button edits the input text message then edit the message show on the pervious todo list <-------------
      // --------> else target help to remove the extra generateing feild after the edit inputtext <----------
      if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputtext;
        addBtn.value = "Add";
        inputBox.value = "";
      } else {
        // ----->create the Edit button in li after click on add button<-------
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("Btn", "edit");
        li.appendChild(editBtn);

        // ----->create the delete button in li after click on add button<-------
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("Btn", "delete");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";
      }
    });
  }
};

// ------> click on the refrese od remove button then delete the localStorage and ui generate on screen <-------
const deleteLocalTodos = (h) => {
  const x = localStorage.getItem("todos");
  const temp = JSON.parse(x);

  let todoText = h;
  console.log(todoText.children[0].innerHTML);
  const text = todoText.children[0].innerHTML;
  for (let index = 0; index < temp.length; index++) {
    const element = temp[index];
    if (element === text) {
      temp.splice(index, 1);
    }
  }
  localStorage.setItem("todos", JSON.stringify(temp));
};

const editLoaclTodos = (text, prevValues) => {
  let localTodo = JSON.parse(localStorage.getItem("todos"));
  console.log("local Todo arr:", localTodo);
  console.log(text, "  ", prevValues);
  for (let i = 0; i < localTodo.length; i++) {
    if (localTodo[i] === prevValues) {
      localTodo[i] = text;
      console.log("saving :", localTodo);
      localStorage.setItem("todos", JSON.stringify(localTodo));
      break;
    }
  }
  //   console.log(y);
  //   //   let text = y.children.innerHTML;
  //   for (let i = 0; i < y.length; i++) {
  //     const edit = y[i];
  //     if (edit === y) {
  //       y.push(i, 1);
  //     } else {
  //       console.log("worng edit ");
  //     }
  //   }
  //   localStorage.setItem("todos", JSON.stringify(y));
  //   let index = y.indexOf(q)
  //   index[]
};
document.addEventListener("DOMContentLoaded", getLocaltodo());
