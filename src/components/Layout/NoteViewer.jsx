import Button from '../Elements/Button';

const NoteViewer = ({ note, onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {note?.title}
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="primary"
            className="px-3 py-1 text-sm"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button 
            variant="danger"
            className="px-3 py-1 text-sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div 
        className="prose prose-sm max-w-none" 
        dangerouslySetInnerHTML={{ __html: note?.content }} 
      />
      
      {note?.image && (
        <div className="mb-6 mt-4">
          <img 
            src={note.image} 
            alt="Note content" 
            className="max-w-full h-auto rounded-lg border border-gray-200"
          />
        </div>
      )}
      
      <div className="text-sm text-gray-500 mt-4">
        Saved on: <span>{note && new Date(note.date).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default NoteViewer;