import React from 'react';
import './styles/Box.css';

export default function Box({ pos, onMouseDown }) {
    return (
        <div 
            className="box" 
            onMouseDown={onMouseDown} 
            style={{ 
                left: pos.x, 
                top: pos.y, 
                position: 'absolute' 
            }}
        >
            <p>Hello</p>
        </div>
    );
}
