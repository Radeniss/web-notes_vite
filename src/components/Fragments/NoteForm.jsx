import React, { useEffect, useState, useRef } from 'react';
import Input from '../Elements/Input';
import Button from '../Elements/Button';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {
  CustomBulletList,
  CustomOrderedList,
  CustomListItem,
  handleListStyle,
} from '../Elements/EditorExtensions/CustomList';

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
  previewUrl,
}) => {
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
  const listDropdownRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      CustomBulletList,
      CustomOrderedList,
      CustomListItem,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listDropdownRef.current && !listDropdownRef.current.contains(event.target)) {
        setIsListDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        <div className="border border-gray-300 rounded-lg">
          {editor && (
            <div className="flex gap-1 p-3 border-b border-gray-300 flex-wrap">
              {/* Group: Text Formatting */}
              <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                  title="Bold"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                  title="Italic"
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                  title="Underline"
                >
                  <u>U</u>
                </button>
              </div>

              {/* Group: List Styles */}
              <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2" ref={listDropdownRef}>
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 rounded hover:bg-gray-200 border border-gray-300 text-sm"
                    title="List Styles"
                    onClick={() => setIsListDropdownOpen(!isListDropdownOpen)}
                  >
                    <span>List</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 overflow-hidden ${
                      isListDropdownOpen ? 'block' : 'hidden'
                    }`}
                  >
                    {/* Bullet List */}
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'disc')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">•</span> Bullet List (Disc)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'circle')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">○</span> Bullet List (Circle)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'square')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">■</span> Bullet List (Square)
                    </button>

                    <div className="border-t my-1"></div>

                    {/* Ordered List */}
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'decimal')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">1.</span> Numbered List
                    </button>
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'lower-alpha')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">a.</span> Lower Alpha List
                    </button>
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'upper-alpha')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">A.</span> Upper Alpha List
                    </button>
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'lower-roman')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">i.</span> Lower Roman List
                    </button>

                    <div className="border-t my-1"></div>

                    {/* Parenthesis */}
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'decimal-parenthesis')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">1)</span> Numbered with Parenthesis
                    </button>
                    <button
                      type="button"
                      onClick={() => handleListStyle(editor, 'lower-alpha-parenthesis')}
                      className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-2 w-4 inline-block">a)</span> Alpha with Parenthesis
                    </button>
                  </div>
                </div>
              </div>

              {/* Group: Text Alignment */}
              <div className="flex gap-1">
                {['left', 'center', 'right', 'justify'].map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign(align).run()}
                    className={`p-2 rounded ${
                      editor.isActive({ textAlign: align }) ? 'bg-gray-200' : ''
                    }`}
                    title={`Align ${align}`}
                  >
                    {align[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="min-h-[200px] p-2">
            <EditorContent
              editor={editor}
              className="prose max-w-full break-words whitespace-pre-wrap"
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
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
          <Button variant="primary" onClick={() => document.getElementById('imageUpload').click()}>
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
              <Button variant="danger" className="mt-2" onClick={onRemoveImage}>
                Remove Image
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Note
        </Button>
      </div>
    </>
  );
};

export default NoteForm;
