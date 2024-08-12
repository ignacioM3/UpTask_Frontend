import { Task } from '../../types'
import AddNotesForm from './AddNotesForm'
import NoteDetails from './NoteDetails'

type NotesPanelProps = {
  notes: Task['notes']
}

export default function NotesPanel({notes}: NotesPanelProps) {
  return (
    <>
      <AddNotesForm />
      <div className='divide-y divide-gray-100 mt-10' >
        {notes.length ? (
          <>
            <p className='font-bold text-2xl text-slate-600 my-5'>Notas: </p>
            {notes.map(note => <NoteDetails key={note._id} note={note} />)}
          </>
        ) : <p className="">No hay notas</p> }
      </div>
    </>
  )
}
