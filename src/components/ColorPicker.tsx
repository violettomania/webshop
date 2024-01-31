import { useState } from 'react';

const colorSelectionClasses = 'border-2 border-secondary';

interface ColorPickerProps {
  colors: string[];
}

export default function ColorPicker({ colors }: ColorPickerProps) {
  const [selected, setSelected] = useState(false);

  // TODO: first button should be selected by default
  // TODO: bugfix: both buttons get selected on click
  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div className='mt-2'>
      {colors.map((color) => (
        <button
          type='button'
          onClick={handleClick}
          className={`badge w-6 h-6 mr-2 ${
            selected ? colorSelectionClasses : ''
          }`}
          style={{ backgroundColor: `${color}` }}
        ></button>
      ))}
    </div>
  );
}
