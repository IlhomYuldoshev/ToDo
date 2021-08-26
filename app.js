const tasks = [
  {
    _id: "4i3u4ht87hhgskj3",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries",
    title: "Lorem Ipsum is simply dummy",
  },
  {
    _id: "o4j398gu8djudg44",
    body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
    title: "Will be distracted",
  },
  {
    _id: "lamsopp3o58h9j98h",
    body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words",
    title: "Lorem Ipsum available",
  },
  {
    _id: "fjnejfni4unfdb",
    body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    title: "It has roots",
  },
];

//*---------------------------------------------

(function (arrayOfTasks) {
  const objOftasks = arrayOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  //?*Elements----------
  const ulList = document.querySelector(".list-group");
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  //*Events---------------
  renderAllTasks(objOftasks);
  form.addEventListener("submit", onFormSubmitHandler);
  ulList.addEventListener("click", onDeleteHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error("TaskListni kirit!!!");
      return;
    }

    const fragment = document.createDocumentFragment();

    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });

    ulList.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body } = 0) {
    const li = document.createElement("li");
    li.setAttribute("data-task-id", _id);
    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    const paragraph = document.createElement("p");
    paragraph.textContent = body;

    const btnDel = document.createElement("button");
    btnDel.textContent = "Delete task";
    btnDel.classList.add("btn-del");

    li.appendChild(span);
    li.appendChild(paragraph);
    li.appendChild(btnDel);
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert(`Formani to'liq to'ldir`);
      return;
    }
    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    ulList.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      _id: `task-${Math.random()}`,
    };
    objOftasks[newTask._id] = newTask;
    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOftasks[id];
    const isConfirm = confirm(`Delete: ${title}`);
    if (!isConfirm) return;
    delete objOftasks[id];
    return isConfirm;
  }

  function deleteFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains("btn-del")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteFromHtml(confirmed, parent);
    }
  }
})(tasks);
