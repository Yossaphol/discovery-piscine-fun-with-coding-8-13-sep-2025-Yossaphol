let TodoList = [];

$(document).ready(function () {
    let save = getCookie("todos");
    if (save) {
      TodoList = JSON.parse(save);
      render();
    }

    $("#new").on("click", newTodo);
  });

function newTodo() {
    let text = prompt("Your Todo:");
    if (text && text.trim() !== "") {
      TodoList.unshift(text.trim()); 
      render();
    }
}

function createTodo(text) {
    const element = $("<div>").addClass("todo");
    const p = $("<p>").text(text);

    element.on("click", function () {
      remove(text);
    });

    element.append(p);
    return element;
}

function remove(text) {
  let yes = confirm(" yes or no you want to remove that TO DO");
  if (yes) {
    TodoList = TodoList.filter((t) => t !== text);
    render();
  }
}

function render() {
    $("#ft_list").html("");
    for (let i = 0; i < TodoList.length; i++) {
      const el = createTodo(TodoList[i]);
      $("#ft_list").append(el);
    }
    setCookie("todos", JSON.stringify(TodoList), 7);
}

function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + days*24*60*60*1000);
    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
    let cname = name + "=";
    let ca = document.cookie.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length);
      }
    }
    return "";
}