var notes = [];
var selectedNote = null;

function readNotes(){
    var storage = localStorage.getItem("notes");
    if(storage){
        notes = JSON.parse(localStorage.getItem("notes"));
    }else{
        notes = [];
    }
};

function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));   
};

document.getElementById("delete").addEventListener("click", deleteAllNotes);

function deleteAllNotes() {

    if(!confirm("Do you want to delete all notes?")) return;

    notes = [];

    saveNotes();
    displayNotes();
};

document.getElementById("add").addEventListener("click", showDialog);

function addNote() {

    notes.push({text:text, date: new Date().toLocaleString()});
    
    saveNotes();
    displayNotes();
};

function showDialog(note){
    var dialog = document.getElementById("dialog");
    dialog.style.display = "block";
};

document.getElementById("close").addEventListener("click", function(){

    var yes = confirm("Close without saving?");

    if( yes ) hideDialog();
});

function hideDialog(){

    selectedNote = null;

    var textarea = document.getElementById("myTextarea");
    textarea.value = "";

    var dialog = document.getElementById("dialog");
    dialog.style.display = "none"; 
};

document.getElementById("save").addEventListener("click", saveDialog);

function saveDialog(){

    var textarea = document.getElementById("myTextarea");
    var text = textarea.value.replaceAll( "\n", "<br>" );

    if( selectedNote ){

        if( selectedNote.text !== text ){

            var yes = confirm("Do you want to update?");

            if( !yes ) return;
        }
        selectedNote.text = text;
    }
    else{
        notes.push( { text: text, date: new Date().toLocaleString() });
    }

    hideDialog();
    saveNotes();
    displayNotes();
};

function editNote(e){
    
    selectedNote = this.note;
    document.getElementById("myTextarea").value = this.note.text.replaceAll( "<br>", "\n" );

    showDialog();
};

function clearNote(e) { 

    var text = this.note.text.replaceAll( "<br>", "\n" );

    if( text.length > 50 ) text = text.substring(0, 50) + "...";

    if(!confirm("Do you want to delete the note with text: " + text )) return;

    var index = notes.indexOf(this.note);
    notes.splice(index, 1);
    
    saveNotes();
    displayNotes();
};

function displayNotes() {

    var message = document.querySelector(".message");
    if(notes.length > 0){
        message.style.display = "none";
    }else{
        message.style.display = "block";
    }

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










