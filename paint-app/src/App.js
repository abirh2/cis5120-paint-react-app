import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { Typography, Slider, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled input for color picker
const ColorPicker = styled('input')({
  width: '7%',
  padding: '10px',
  margin: '10px 0',
});

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(3);
  const [lineColor, setLineColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    // Correctly handle the event object provided by React
    const startDrawing = (event) => {
      const { offsetX, offsetY } = event; // Access offsetX and offsetY directly
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    };
  
    const draw = (event) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = event; // Access offsetX and offsetY directly
      context.strokeStyle = lineColor;
      context.lineWidth = lineWidth;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };
  
    const stopDrawing = () => {
      if (!isDrawing) return;
      context.closePath();
      setIsDrawing(false);
    };
  
    // Attach event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  
    // Cleanup function to remove event listeners
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing, lineWidth, lineColor]);  

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSliderChange = (event, newValue) => {
    setLineWidth(newValue);
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', paddingTop: '10px' }}>
      <Typography variant="h4">
        My Paint Application
      </Typography>
      <Typography variant="subtitle1">
        Created by Abir Hossain
      </Typography>
      <Box
        sx={{
          margin: '20px auto',
          border: '2px solid black',
          display: 'inline-block',
          '& canvas': {
            display: 'block',
          },
        }}
      >
        <canvas ref={canvasRef} width={800} height={600} />
      </Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          margin: '20px auto', 
          gap: '20px', 
        }}
      >
        <ColorPicker
          type="color"
          value={lineColor}
          onChange={(e) => setLineColor(e.target.value)}
        />
        <Box sx={{ width: 300 }}> 
          <Slider
            min={1}
            max={10}
            defaultValue={3}
            aria-label="Line Width"
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={clearCanvas}>
          Clear All
        </Button>
      </Box>
    </Box>
  );
}

export default App;
