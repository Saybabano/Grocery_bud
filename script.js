let alert = document.querySelector(".alert");
let form = document.querySelector(".grocery-form");
let grocery = document.querySelector(".input");
let submitBtn = document.querySelector("#btn");
let container = document.querySelector(".grocery-container");
let list = document.querySelector(".grocery-list");
let clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";

form.addEventListener("submit", addItem);

function addItem(e) {
    e.preventDefault();
    let value = grocery.value.trim();
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        console.log("Add item to list");
        createListItem(id, value);
        displayAlert("Item added to the list", "success");
        container.classList.add("show-container");
        setBackToDefault();
    } else if (value && editFlag) {
        console.log("Editing item");
        editElement.innerHTML = value;
        displayAlert("Item edited", "success");
        setBackToDefault();
    } else {
        displayAlert("Please enter value", "danger");
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function() {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

function createListItem(id, value) {
    const element = document.createElement('div');
    element.classList.add('grocery-item');
    element.setAttribute('data-id', id);
    element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="trash-btn btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    const editBtn = element.querySelector('.edit-btn');
    const deleteBtn = element.querySelector('.trash-btn');

    editBtn.addEventListener('click', editItem);
    deleteBtn.addEventListener('click', deleteItem);

    list.appendChild(element);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    editElement = element.querySelector('.title');
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'Edit';
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert("Item removed", "danger");
    setBackToDefault();
}

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'Submit';
}

