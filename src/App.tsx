import { useEffect, useRef, useState } from 'react';
import './App.css';
import Box from './shapes/Box';

function App() {
  const [boxes, setBoxes] = useState([]);
  const dragging = useRef({ active: false, id: null });
  const offset = useRef({ x: 0, y: 0 });
  const boardRef = useRef(null);

  function addBox() {
    const newBox = {
      id: Date.now(),
      pos: { x: 0, y: 0 }
    };
    setBoxes((prev) => [...prev, newBox]);
  }

  function startDragging(e, id) {
    dragging.current = { active: true, id };
    const box = boxes.find((b) => b.id === id);
    if (box) {
      offset.current = {
        x: e.clientX - box.pos.x,
        y: e.clientY - box.pos.y
      };
    }
  }

  function stopDragging() {
    dragging.current = { active: false, id: null };
  }

  function onMouseMove(e) {
    if (!dragging.current.active || !boardRef.current) return;
    const { id } = dragging.current;
    const boardRect = boardRef.current.getBoundingClientRect();
    const boxWidth = 100;
    const boxHeight = 100;

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    newX = Math.max(0, Math.min(newX, boardRect.width - boxWidth));
    newY = Math.max(0, Math.min(newY, boardRect.height - boxHeight));

    setBoxes((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, pos: { x: newX, y: newY } } : b
      )
    );
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDragging);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [boxes]);

  return (
    <div className='main'>
      <div className="header">
        <h3>Work in progress</h3>
      </div>
      <div className="side">
        <button onClick={addBox}>Add Box</button>
      </div>
      <div className="board" ref={boardRef}>
        {boxes.map((box) => (
          <Box
            key={box.id}
            pos={box.pos}
            onMouseDown={(e) => startDragging(e, box.id)}
          />
        ))}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;

