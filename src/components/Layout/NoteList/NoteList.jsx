import NoteForm from '../Fragments/NoteForm';
const NoteList = ({ notes, onNoteClick }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onClick={() => onNoteClick(note)} 
        />
      ))}
    </div>
  );
};

export default NoteList;