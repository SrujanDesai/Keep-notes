const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNotes = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `       
    <div class="operation">
        <button class="edit"> <i class="fa-solid fa-user-pen"></i> </button>
        <button class="delete"> <i class="fa-solid fa-trash-can"></i> </button>
    </div>

    <div class="main ${text ? "" : "hidden"} "></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);



    // getting the references
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //delete
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })

    // toggle using edit button
    textArea.value = text;   // If already some text is added.
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {           // event object is the parent object of all event 
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updateLSData();
    })

    document.body.appendChild(note);  // it appends a node as the last child of node.

}

// getting data back from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) { notes.forEach((note) => addNewNotes(note)) };

addButton.addEventListener('click', () => addNewNotes());