import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import Toolbar from "./components/Toolbar";

interface Widgets {
  id: string;
  x: number;
  y: number;
  content: string;
}

const App: React.FC = () => {
  const [widgets, setWidgets] = useState<Widgets[]>([
    { id: "1", x: 100, y: 100, content: "Widget 1" },
    { id: "2", x: 100, y: 500, content: "Widget 2" },
  ]);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setWidgets((prevWidgets) =>
        prevWidgets.map((note) => ({
          ...note,
          x: Math.min(note.x, innerWidth - 100), // Adjust x if it's outside
          y: Math.min(note.y, innerHeight - 50), // Adjust y if it's outside
        }))
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addNote = () => {
    setWidgets((prevWidgets) => [
      ...prevWidgets,
      {
        id: Date.now().toString(),
        x: 100,
        y: 100,
        content: "New Sticky Note",
      },
    ]);
  };

  const updateNotePosition = (id: string, x: number, y: number) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, x, y } : widget
      )
    );
  };

  return (
    <div className="relative h-screen w-full">
      <Toolbar />
      <div className="relative h-screen w-full overflow-hidden">
        {widgets.map((widget) => (
          <Draggable
            key={widget.id}
            position={{ x: widget.x, y: widget.y }}
            onStop={(_e, data) => updateNotePosition(widget.id, data.x, data.y)}
          >
            <div className="bg-yellow-300 p-3 cursor-move absolute w-24 h-24">
              {widget.content}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default App;
