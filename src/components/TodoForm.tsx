import { useState, useEffect, useRef } from "react";

type TodoFormProps = {
  onAdd: (text: string) => void;
  error: string | null;
};

const TodoForm = ({ onAdd, error }: TodoFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          className="p-2 border w-full border-gray-400 rounded"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new todo"
        />
        <button
          className="bg-violet-600 text-white px-4 cursor-pointer rounded"
          type="submit"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default TodoForm;
