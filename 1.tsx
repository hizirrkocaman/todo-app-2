import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: crypto.randomUUID(), text: "React öğren", completed: false },
    { id: crypto.randomUUID(), text: "Pratik yap", completed: false },
    { id: crypto.randomUUID(), text: "Tekrar et", completed: false },
  ]);
  const [error, setError] = useState<string | null>(null);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Boş todo giremezsin");
      return;
    }

    setTodos((prev) => {
      const isExist = prev.some(
        (todo) => todo.text.trim().toLowerCase() === trimmed.toLowerCase()
      );

      if (isExist) {
        setError("Bu todo zaten var");
        return prev;
      }

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
      };
      setError(null);
      return [...prev, newTodo];
    });
    setText("");
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Todo ekle"
        />
        <button type="submit">Ekle</button>
        {error}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  marginLeft: 6,
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Sil</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default App;

