import { useRef, useState } from 'react'
import './App.css'
import Box from './shapes/Box';
function App() {



  const [items,setitems]=useState([]);
  const [past,setpast]=useState([]);
  const [future,setfuture]=useState([]);

  const boardRef=useRef(null)
  const dragging=useRef(null)
  const marqueestart=useRef({x:0,y:0})

  const [selecting,setselecting]=useState(false)
  const [marquee,setmarquee]=useState({x:0,y:0,width:0,height:0});

  function addshape(ShapeComponent=Box){

  }

  return (
    <div className='main'>
      <div className="header">
        <h3>Working in pogress</h3>
      </div>
      <div className="side"></div>
      <div className="board">
        <Box></Box>
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
