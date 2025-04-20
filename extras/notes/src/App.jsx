import { useState, useEffect } from 'react'
import { Note } from './components/Note'
import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      });

      // With Fetch:
      // fetch('http://localhost:3001/notes')
      // .then(response => {
      //   console.log("first response: ", response);
      //   return response.json(); // ← return the Promise here!
      // })
      // .then(json => {
      //   console.log('final json', json); // ← now json will be the parsed data
      // });


      // ******* Alternatively: *********
      // try {
      //   const response = await fetch('http://localhost:3001/notes');
      //   if (!response.ok) {
      //    throw new Error(`Response status: ${response.status}`);
      //   }
      //   const json = await response.json();
      //   console.log('From Fetch', json);
      // } catch (err) {
      //   console.err(err)
      // }
  }, []);
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    noteService
      .create(noteObject)
      .then(newNode => {
        setNotes(notes.concat(newNode))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server: ${error}`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" id='add-note' value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App