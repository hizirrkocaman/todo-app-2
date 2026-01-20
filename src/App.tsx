import { useState, useEffect, useReducer } from "react";
import type { Todo } from "./types/todo";
import type { Filter } from "./types/filter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";

const TODOS_KEY = "todos_v1";

type TodosAction =
  | { type: "ADD"; todo: Todo }
  | { type: "DELETE"; id: string }
  | { type: "EDIT"; id: string; text: string }
  | { type: "TOGGLE"; id: string }
  | { type: "CLEAR_COMPLETED" };

function todosReducer(state: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.todo];

    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);

    case "EDIT":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todosReducer, undefined, () => {
    const saved = localStorage.getItem(TODOS_KEY);
    if (!saved) {
      return [
        { id: crypto.randomUUID(), text: "Learn react", completed: false },
        { id: crypto.randomUUID(), text: "Wash dishes", completed: false },
        { id: crypto.randomUUID(), text: "Repeat it", completed: false },
      ];
    }

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as Todo[]) : [];
    } catch {
      return [];
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  const total = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = total - completedCount;

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const addTodo = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) {
      setError("Todo can not be empty!");
      return;
    }

    const lower = trimmed.toLowerCase();

    const isExist = todos.some(
      (todo) => todo.text.trim().toLowerCase() === lower
    );
    if (isExist) {
      setError("Already there is!");
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    setError(null);
    dispatch({ type: "ADD", todo: newTodo });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE", id });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE", id });
  };

  const editTodo = (id: string, rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) {
      setError("Todo can not be empty!");
      return;
    }

    const lower = trimmed.toLowerCase();

    const isExist = todos.some(
      (todo) => todo.id !== id && todo.text.trim().toLowerCase() === lower
    );

    if (isExist) {
      setError("Already there is!");
      return;
    }
    setError(null);
    dispatch({ type: "EDIT", id, text: trimmed });
  };

  const clearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-xl w-116 flex flex-col bg-white/95 shadow-2xl rounded-2xl p-6 gap-2">
        <h1 className="text-3xl text-slate-900 font-bold">Todo App</h1>
        <TodoForm onAdd={addTodo} error={error} />
        <TodoFilters
          filter={filter}
          onChange={setFilter}
          total={total}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
        {visibleTodos.length === 0 ? (
          <p>
            {filter === "all" && "There's no todo yet."}
            {filter === "active" && "No active todo."}
            {filter === "completed" && "No todo completed."}
          </p>
        ) : (
          <TodoList
            todos={visibleTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
