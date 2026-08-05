"use strict"
const tasks = []
  
function renderTasks() {
  $("ul").empty();
 // Loop the tasks array and creates a list items
  tasks.forEach(function(task, index) {
  // Creating a new list item with delete and edit icons 
    const newItem = $(`
    <li>
    <span class="left"><i class="fa fa-trash"></i></span>
    <span class="text">${task}</span>
    <span class="right"><i class="fa fa-pen"></i> </span>
    </li>
    `);

    // Added item to the list creates a Jquery fade animation
$("ul").append(newItem.hide().fadeIn());
  });
}

function addTask(task) {
 tasks.push(task);
  renderTasks();
}

$("#todoForm").on("submit", function(event){
  event.preventDefault();

  const inputValue = $(".todoinput").val().trim();
// Nothing happens if the input is empty
  if(inputValue ==="") return;

  addTask(inputValue);
  $(".todoinput").val("");
});

$(".fa-plus").on("click", function(){
  $("form").slideToggle();
});

// a task is marked as completed when clicked
$("ul").on("click", ".text", function(){
  $(this).toggleClass("completed");
});


$("ul").on("click", ".left", function(){
  const index = $(this).parent().index();
  tasks.splice(index, 1);

  $(this).parent().fadeOut(400, function(){
    renderTasks();
  });
});

$("ul").on("click", ".right", function(){
  const li = $(this).parent();
  const index = li.index();
  const textSpan = li.find(".text");

  const input = $(`<input class="edit-input" value="${tasks[index]}">`);
  textSpan.replaceWith(input);
  input.focus();
  
  input.on("blur", function(){
    const newValue = $(this).val().trim();
    if(newValue !== ""){
      tasks[index] = newValue;  
  }
   renderTasks();
  });
});

