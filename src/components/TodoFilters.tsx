import type { Filter } from "../types/filter";

type TodoFilterProps = {
  filter: Filter;
  onChange: (next: Filter) => void;
  total: number;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const baseClass = "px-3 py-1 rounded cursor-pointer transition-colors";

const activeClass = "bg-black text-white";
const inActiveClass = "bg-gray-200 text-black";

const TodoFilters = ({
  filter,
  onChange,
  total,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFilterProps) => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex flex-wrap gap-3">
        <button
          className={`${baseClass} ${
            filter === "all" ? activeClass : inActiveClass
          }`}
          type="button"
          onClick={() => onChange("all")}
          disabled={filter === "all"}
        >
          All
        </button>
        <button
          className={`${baseClass} ${
            filter === "active" ? activeClass : inActiveClass
          }`}
          type="button"
          onClick={() => onChange("active")}
          disabled={filter === "active"}
        >
          Active
        </button>
        <button
          className={`${baseClass} ${
            filter === "completed" ? activeClass : inActiveClass
          }`}
          type="button"
          onClick={() => onChange("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>
        <button
          className="bg-gray-200 px-3 py-1 rounded cursor-pointer opacity-95"
          type="button"
          onClick={onClearCompleted}
          disabled={completedCount === 0}
        >
          Clear Completed
        </button>
      </div>
      <p>
        Total: {total} | Active: {activeCount} | Completed: {completedCount}
      </p>
    </div>
  );
};

export default TodoFilters;
