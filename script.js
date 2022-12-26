const addNoteBtn = document.querySelector(".btn")
const mainNoteSection = document.querySelector('main')

// add note logic
addNoteBtn.addEventListener("click",()=>{
    addNote();
})

// function to add the note
const addNote = (text = "")=>{
    const notes = document.createElement('div');
    notes.classList.add('note');
    notes.innerHTML = `
    <div class="toolbar">
        <div class="icon">
            <i class="save fa-regular fa-floppy-disk"></i>
            <i class="delete fa-solid fa-trash"></i>
        </div>
    </div>
    <textarea>${text}</textarea>  `
    //delete note logic
    const deleteNote = notes.querySelector(".delete");
    deleteNote.addEventListener("click",()=>{
        notes.remove();
        saveNotes();
    })
    // save note logic
    notes.querySelector('.save').addEventListener('click',()=>{
        saveNotes();
    })
    notes.querySelector('textarea').addEventListener('focusout',()=>{
        saveNotes();
    })
    mainNoteSection.append(notes)
    saveNotes();
}
// function to save the note
const saveNotes = ()=>{
    const notesAll = document.querySelectorAll(".note textarea");
    const data = [];
    notesAll.forEach((note)=>{
        data.push(note.value);
    })
    if(data.length===0){
        localStorage.removeItem("notes");
    }else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
    
}

(
    function() {
        const lclStrgNotes = JSON.parse(localStorage.getItem("notes"))
        console.log(lclStrgNotes)
        
        if(lclStrgNotes === null){
            addNote();
        }else{
            lclStrgNotes.forEach(lnotes=>{
                addNote(lnotes);
            })
        }
    }
)()