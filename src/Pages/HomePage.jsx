import React, { useState, useEffect } from 'react';
import MainTemplate from '../components/Templates/MainTemplate';
import NoteList from '../components/Layout/NoteList';
import NoteForm from '../components/Fragments/NoteForm';
import NoteViewer from '../components/Layout/NoteViewer';

const HomePage = () => {
  // State management
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('No image selected');
  const [isViewMode, setIsViewMode] = useState(false);

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

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

    // Fungsi untuk menghapus note
  const deleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
      if (currentNote && currentNote.id === noteId) {
        resetEditor();
      }
    }
  };


  // Remove image
  const handleRemoveImage = () => {
    setPreviewUrl('');
    setFileName('No image selected');
    if (document.getElementById('imageUpload')) {
      document.getElementById('imageUpload').value = '';
    }
  };

  // Save note
  const saveNote = () => {
  if (!title.trim()) {
    alert('Please enter a title for your note');
    return;
  }

  const newNote = {
    id: currentNote ? currentNote.id : Date.now().toString(),
    title,
    content, // <-- Ini akan berisi HTML dari editor
    date: currentNote ? currentNote.date : new Date().toISOString(),
    image: previewUrl
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
    setPreviewUrl('');
    setFileName('No image selected');
    setCurrentNote(null);
    setIsViewMode(false);
    if (document.getElementById('imageUpload')) {
      document.getElementById('imageUpload').value = '';
    }
  };

  // Template sections
  const header = (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">Notes Journal</h1>
      <p className="text-gray-600">Capture your thoughts, save your memories</p>
    </header>
  );

  const sidebar = (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Notes</h2>
      <NoteList 
        notes={notes} 
        onNoteClick={viewNote} 
        onDeleteNote={deleteNote} 
      />
    </>
  );

  const mainContent = isViewMode ? (
    <NoteViewer 
      note={currentNote} 
      onEdit={editNote} 
      onDelete={deleteNote} 
    />
  ) : (
    <NoteForm
      title={title}
      content={content}
      onTitleChange={setTitle} // Menggunakan setTitle langsung
      onContentChange={setContent} // Menggunakan setContent langsung
      onSave={saveNote}
      onClear={resetEditor}
      fileName={fileName}
      onImageUpload={handleImageUpload}
      onRemoveImage={handleRemoveImage}
      previewUrl={previewUrl}
    />
  );

  return (
    <MainTemplate 
      header={header}
      sidebar={sidebar}
      mainContent={mainContent}
    />
  );
};

export default HomePage;