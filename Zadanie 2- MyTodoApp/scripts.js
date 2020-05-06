"use strict"
let todoList = []; //declares a new array for Your todo list


//Loads data from jsonbin
$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: '',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'secret-key': ''
    },
    success: (data) => {
        // console.log(data);
        todoList = data;
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
});


//Saves data to jsonbin
let updateJSONbin = function () {
    $.ajax({
        url: '',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': ''
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    })
};


//Adds new todoelement from form to todoList (on the top of the .js)
let addTodo = function () {
    //get the elements in the form
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputPlace = $("#inputPlace");
    let inputDate = $("#inputDate");

    //get the  values from the form
    let newTitle = inputTitle[0].value;
    let newDescription = inputDescription[0].value;
    let newPlace = inputPlace[0].value;
    let newDate = new Date(inputDate[0].value);

    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };

    //add item to the list and updates the repo
    todoList.push(newTodo);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateJSONbin();

    //reset the value placeholders in html
    inputTitle.val("");
    inputDescription.val("");
    inputPlace.val("");
    inputDate.val("");
}


//Removes todoElement from list and updates the repo
let deleteTodo = function (index) {
    todoList.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateJSONbin();
}


//Removes all elements from html's todoListDiv and replaces it with todoList elements
let updateTodoList = function () {
    //remove every data row from table
    let todoTableBody = $("#todoTableBody");
    todoTableBody.empty();

    //get the values from search form
    let filterPhrase = $("#searchPhrase")[0].value;
    let fromDate = $("#searchFromDate")[0].value;
    let toDate = $("#searchToDate")[0].value;

    //check which plans match to search values and adds them into clear table
    for (let todo in todoList) {
        if (
            ((filterPhrase == "") ||
                (todoList[todo].title.includes(filterPhrase)) ||
                (todoList[todo].description.includes(filterPhrase))) &&
            ((fromDate == "") || todoList[todo].dueDate >= fromDate) &&
            ((toDate == "") || todoList[todo].dueDate <= toDate)
        ) {


            let row = createTodoTableRow(todo);
            todoTableBody.append(row);
        }
    }
}


let createTodoTableRow = function (todo) {
    let newDeleteButton = $("<input/>");
    newDeleteButton.attr({
        type: 'button',
        value: 'Remove',
        class: 'btn btn-danger btn-md'
    });
    newDeleteButton.click(function () {
        deleteTodo(todo);
    })

    let row = $("<tr></tr>");
    let title = $("<td></td>").text(todoList[todo].title);
    let description = $("<td></td>").text(todoList[todo].description)
    let place = $("<td></td>").text(todoList[todo].place)
    let dueDate = $("<td></td>").text(new Date(todoList[todo].dueDate).toDateString())
    let button = $("<td></td>").append(newDeleteButton);

    row.append(title, description, place, dueDate, button);

    return row;
}


setInterval(updateTodoList, 1000);
