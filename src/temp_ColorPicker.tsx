import { useState } from 'react';

const colorSelectionClasses = 'border-2 border-secondary';

interface ColorPickerProps {
  colors: string[];
}

export default function ColorPicker({ colors }: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState('');

  // TODO: first button should be selected by default
  const handleClick = (event: React.MouseEvent, color: string) => {
    event.stopPropagation();
    setCurrentColor(color);
  };

  return (
    <div className='mt-2'>
      {colors.map((color) => (
        <button
          type='button'
          onClick={(e) => handleClick(e, color)}
          className={`badge w-6 h-6 mr-2 ${
            color === currentColor ? colorSelectionClasses : ''
          }`}
          style={{ backgroundColor: `${color}` }}
        ></button>
      ))}
    </div>
  );
}
