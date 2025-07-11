import React, { useState, useEffect, useRef } from 'react';

function App() {
  // State management
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('No image selected');
  const [isViewMode, setIsViewMode] = useState(false);

  // Refs
  const fileInputRef = useRef(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl('');
    setFileName('No image selected');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Save note
  const saveNote = async () => {
    if (!title.trim()) {
      alert('Please enter a title for your note');
      return;
    }

    if (!content.trim()) {
      alert('Please enter some content');
      return;
    }

    let imageData = null;
    if (imageFile) {
      imageData = await getImageDataUrl(imageFile);
    } else if (currentNote && currentNote.image) {
      imageData = currentNote.image;
    }

    const newNote = {
      id: currentNote ? currentNote.id : Date.now().toString(),
      title,
      content,
      date: currentNote ? currentNote.date : new Date().toISOString(),
      image: imageData
    };

    if (currentNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === currentNote.id ? newNote : note
      ));
    } else {
      // Add new note
      setNotes([...notes, newNote]);
    }

    resetEditor();
    alert('Note saved successfully!');
  };

  // View note
  const viewNote = (note) => {
    setCurrentNote(note);
    setIsViewMode(true);
  };

  // Edit note
  const editNote = () => {
    setIsViewMode(false);
    setTitle(currentNote.title);
    setContent(currentNote.content);
    if (currentNote.image) {
      setPreviewUrl(currentNote.image);
      setFileName('Uploaded image');
    }
  };

  // Reset editor
  const resetEditor = () => {
    setTitle('');
    setContent('');
    setImageFile(null);
    setPreviewUrl('');
    setFileName('No image selected');
    setCurrentNote(null);
    setIsViewMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Convert image to data URL
  const getImageDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Notes Journal</h1>
          <p className="text-gray-600">Capture your thoughts, save your memories</p>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Note List */}
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Notes</h2>
            {notes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No notes yet. Create your first note!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map(note => (
                  <div 
                    key={note.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-md"
                    onClick={() => viewNote(note)}
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
            )}
          </div>

          {/* Editor Area */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {!isViewMode ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {currentNote ? "Edit Note" : "New Note"}
                </h2>
                <div className="mb-4">
                  <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="noteTitle"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="noteContent"
                    rows="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="imageUpload"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Choose Image
                    </button>
                    <div className="text-sm text-gray-500">{fileName}</div>
                  </div>
                  
                  {(previewUrl || (currentNote && currentNote.image)) && (
                    <div className="mt-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <img 
                          src={previewUrl || currentNote.image} 
                          alt="Preview" 
                          className="mx-auto max-h-[200px] object-contain"
                        />
                        <button
                          onClick={handleRemoveImage}
                          className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    onClick={resetEditor}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={saveNote}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {currentNote?.title}
                  </h2>
                  <button
                    onClick={editNote}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <p className="whitespace-pre-line text-gray-700 mb-4">
                  {currentNote?.content}
                </p>
                {currentNote?.image && (
                  <div className="mb-6">
                    <img 
                      src={currentNote.image} 
                      alt="Note content" 
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Saved on: <span>{currentNote && new Date(currentNote.date).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;