const Toolbar: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 flex flex-col bg-slate-400 z-10 p-4">
      <button className="mb-2">
        Add Note
      </button>
      <button className="mb-2">Youtube</button>
      <button className="mb-2">Pomodoro</button>
      <button className="mb-2">Todo List</button>
      <button className="mb-2">Color Pallette</button>
    </div>
  );
};

export default Toolbar;
