import { useState } from "react";
import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setisEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function startEdit() {
    setDraft(todo.text);
    setisEditing(true);
  }

  function cancelEdit() {
    setDraft(todo.text);
    setisEditing(false);
  }

  function saveEdit() {
    onEdit(todo.id, draft);
    setisEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  }

  return (
    <li className="flex gap-2 p-4 bg-gray-200 cursor-pointer group rounded">
      <input
        className="cursor-pointer"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {!isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <span className="flex-1 p-1"
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">

          <button className="bg-yellow-500 px-2 py-1 rounded text-white cursor-pointer" type="button" onClick={startEdit}>
            Edit
          </button>
          <button className="bg-red-500 px-2 py-1 text-white rounded cursor-pointer" type="button" onClick={() => onDelete(todo.id)}>
            Delete
          </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-1">
          <input className="flex-1 px-2 py-1 rounded"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="bg-green-600 text-white px-2 py-1 rounded cursor-pointer" type="button" onClick={saveEdit}>
            Save
          </button>
          <button className="bg-slate-500 text-white px-2 py-1 rounded cursor-pointer" type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
