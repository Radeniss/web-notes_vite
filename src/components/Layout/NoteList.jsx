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
        <div 
          key={note.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-md"
          onClick={() => onNoteClick(note)}
        >
          <h4 className="font-medium text-gray-800 truncate">{note.title}</h4>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {note.content.substring(0, 50)}
            {note.content.length > 50 ? '...' : ''}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-400">
              {new Date(note.date).toLocaleDateString()}
            </span>
            {note.image && (
              <span className="text-xs bg-indigo-100 text-indigo-800 rounded-full px-2 py-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photo
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;