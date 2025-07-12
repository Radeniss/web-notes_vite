const NoteList = ({ notes, onNoteClick, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No notes yet. Create your first note!</p>
      </div>
    );
  }

  const stripHtml = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

  return (
    <div className="space-y-4">
      {notes.map(note => (
        <div 
          key={note.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-md relative"
        >
          {/* Tombol hapus */}
          <button
            className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          <div onClick={() => onNoteClick(note)}>
            <h4 className="font-medium text-gray-800 truncate pr-6">{note.title}</h4>
            <p className="text-sm text-gray-500 mt-1 truncate">
            {stripHtml(note.content).substring(0, 50)}
            {stripHtml(note.content).length > 50 ? '...' : ''}
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
        </div>
      ))}
    </div>
  );
};

export default NoteList;