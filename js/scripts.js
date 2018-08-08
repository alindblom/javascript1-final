let toDoInput = document.querySelector("#toDoInput");
let addToDoBtn = document.querySelector("#toDoBtn");
let toDoContainer = document.querySelector("#toDoContainer");
let toDoList = document.querySelector("#toDoList");
let doneList = document.querySelector("#doneList");
let toDoForm = document.forms.toDoForm;
let toDoLiText;
let toDoArray = [];

/* this function does the following:
- defines editBtn, doneBtn, deleteBtn and creates DOM element
- adds classes to editBtn, doneBtn, deleteBtn
- appends editBtn, doneBtn, deleteBtn to each li
*/
function addLiEditBtns(thisLi){
	let editBtn = document.createElement("button");
	editBtn.classList.add("btn", "edit-btn", "far", "fa-edit", "margin-top");

	let doneBtn = document.createElement("button");
	doneBtn.classList.add("btn", "done-btn", "far", "fa-check-square", "margin-top");

	let deleteBtn = document.createElement("button");
	deleteBtn.classList.add("btn", "delete-btn", "far", "fa-trash-alt", "margin-top");

	thisLi.appendChild(editBtn);
	thisLi.appendChild(doneBtn);
	thisLi.appendChild(deleteBtn);

	//when edit button is clicked
	editBtn.addEventListener("click", e => {
		let toDoLiText = editBtn.parentNode.value;
		let editInput = document.createElement("input");
		editInput.setAttribute("type", "text");
		thisLi.appendChild(editInput);

		editInput.addEventListener("keydown", e => {
			if(e.keyCode == 13){
				editBtn.parentNode.textContent = (`${editInput.value} `);
				editInput.style.display = "none";
				addLiEditBtns(thisLi);
			};
		});
	});

	//when done button is clicked
	doneBtn.addEventListener("click", e => {
		doneBtn.parentNode.classList.add("strikethrough");
		let doneLi = document.createElement("li");
		doneLi.textContent = (`${toDoLiText} `);
		setTimeout(
			() => {editBtn.parentNode.style.display = "none";},
			3000
		);
		setTimeout(
			() => {doneList.appendChild(doneLi)},
			3000
		);
	});

	// when delete button is clicked
	deleteBtn.addEventListener("click", e => {
		let deleteAlert = confirm("Are you sure you want to delete?");
		if(deleteAlert === true){
			deleteBtn.parentNode.remove();
		} else {
			console.log("canceled");
		};
	});
};

/* when submit button is clicked:
- pushes value of todo input into an array
- function:
	- creates DOM li element
	- adds todo input value as the text content
	- calls editBtn function and passes in the li to append button to
	- appends li to the ul
*/
toDoForm.addEventListener("submit", e => {
	e.preventDefault();
	toDoArray.push(toDoInput.value);
	for(input = 0; input < toDoArray.length; input++){
		function createToDoLi(input) {
			let toDoLi = document.createElement("li");
			toDoLi.textContent = (`${input.value} `);
			addLiEditBtns(toDoLi);
			toDoList.appendChild(toDoLi);
		};
	};
	createToDoLi(toDoInput);
	toDoForm.reset();
});

//moving todo li over to done list
