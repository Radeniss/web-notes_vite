import React, { useEffect } from 'react';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

const NoteForm = ({ 
  title, 
  content, 
  onTitleChange, 
  onContentChange, 
  onSave,
  onClear,
  fileName,
  onImageUpload,
  onRemoveImage,
  previewUrl
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      })
    ],
    content: content,
    onUpdate: ({ editor }) => {
      // Update state content saat editor berubah
      onContentChange(editor.getHTML());
    },
  });

  // Perbarui editor saat content berubah
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <>
      <Input 
        label="Title"
        id="noteTitle"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        
        {editor && (
    <div className="flex gap-1 mb-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
      >
        List
      </button>
    </div>
  )}
        
        {/* Editor Tiptap */}
        <div className="border border-gray-300 rounded-lg min-h-[200px]">
          <EditorContent editor={editor} />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Image</label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
          <Button 
            variant="primary"
            onClick={() => document.getElementById('imageUpload').click()}
          >
            Choose Image
          </Button>
          <div className="text-sm text-gray-500">{fileName}</div>
        </div>
        
        {previewUrl && (
          <div className="mt-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="mx-auto max-h-[200px] object-contain"
              />
              <Button
                variant="danger"
                className="mt-2"
                onClick={onRemoveImage}
              >
                Remove Image
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onClear}>Clear</Button>
        <Button variant="primary" onClick={onSave}>Save Note</Button>
      </div>
    </>
  );
};

export default NoteForm;