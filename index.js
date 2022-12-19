var notes = [];

function readNotes(){
    var storage = localStorage.getItem("notes");
    if(storage){
        notes = JSON.parse(localStorage.getItem("notes"));
    }else{
        notes = [];
    }
}

function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));   
}

document.getElementById("delete").addEventListener("click", deleteAllNotes);

function deleteAllNotes() {

    if(!confirm("Do you want to delete all notes:")) return;

    notes = [];

    saveNotes();
    displayNotes();
}

document.getElementById("add").addEventListener("click", addNote);

function addNote() {
    var text = prompt("Add note:");

    if(!text) return;

    console.log(text);

    notes.push({text:text, date: new Date().toUTCString()});
    
    saveNotes();
    displayNotes();
}

function editNote(e) {

    var note = this.note;

    var text = prompt("Add note:", note.text);

    if(!text) return alert("Do you want to delete this note?\nUse the delete button, please!");

    note.text = text;

    saveNotes();
    displayNotes();
}

function clearNote(e) { 

    if(!confirm("Do you want to delete the note with text: " + this.note.text)) return;

    var index = notes.indexOf(this.note);
    notes.splice(index, 1);
    
    saveNotes();
    displayNotes();
}

function displayNotes() {
    var container = document.getElementById("notesList");
    container.innerHTML = "";

    for(var i=notes.length - 1; i>=0; i--){
        displayNote(notes[i]);
    }
    console.log(notes);
}

function displayNote(note) {
    var container = document.getElementById("notesList");
    var div = document.createElement("div");
    div.insertAdjacentHTML("beforeend", "<div class='column notes'><div class='buttons end img'></div><div class='text'></div><div class='date end'></div></div>");
    
    var buttons = div.querySelector(".buttons");
    var edit = document.createElement("button");
    var clear = document.createElement("button");
    edit.note = note;
    clear.note = note;
    edit.innerHTML = "<img src='7.png' class='note-buttons-img6'>"
    clear.innerHTML = "<img src='8.png' class='note-buttons-img3'>"  
    edit.classList.add("note-buttons");
    edit.classList.add("note-buttons-img");
    clear.classList.add("note-buttons");
    clear.classList.add("note-buttons-img"); 
    edit.onclick = editNote;
    clear.onclick = clearNote;
    buttons.appendChild(edit);
    buttons.appendChild(clear);

    var text = div.querySelector(".text");
    var date = div.querySelector(".date");

    text.innerHTML = note.text;
    date.innerHTML = note.date;
    date.classList.add("date");

    container.appendChild(div);
}

readNotes();

displayNotes();










