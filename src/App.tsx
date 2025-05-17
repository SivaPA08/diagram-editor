import { useEffect, useRef, useState } from 'react';
import './App.css';
import Box from './shapes/Box';

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const boardRef = useRef(null);

  function startDragging(e) {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
  }

  function stopDragging() {
    dragging.current = false;
  }

  function onMouseMove(e) {
    if (dragging.current && boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();

      let newX = e.clientX - offset.current.x;
      let newY = e.clientY - offset.current.y;

      // Boundaries: Box stays inside board
      const boxWidth = 100; // match your Box CSS width
      const boxHeight = 100; // match your Box CSS height

      newX = Math.max(0, Math.min(newX, boardRect.width - boxWidth));
      newY = Math.max(0, Math.min(newY, boardRect.height - boxHeight));

      setPos({ x: newX, y: newY });
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDragging);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [pos]);

  return (
    <div className='main'>
      <div className="header">
        <h3>Work in progress</h3>
      </div>
      <div className="side"></div>
      <div className="board" ref={boardRef}>
        <Box pos={pos} onMouseDown={startDragging} />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
