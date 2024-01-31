import { useState } from 'react';

const colorSelectionClasses = 'border-2 border-secondary';

interface ColorPickerProps {
  color: string;
}

export default function ColorPicker({ color }: ColorPickerProps) {
  const [selectedClasses, setSelectedClasses] = useState(colorSelectionClasses);

  const handleClick = () => {
    selectedClasses === colorSelectionClasses
      ? setSelectedClasses('')
      : setSelectedClasses(colorSelectionClasses);
  };

  return (
    <>
      <button
        type='button'
        className={`badge w-6 h-6 mr-2 ${selectedClasses}`}
        onClick={handleClick}
        style={{ backgroundColor: `${color}` }}
      ></button>
      <button
        type='button'
        className={`badge w-6 h-6 mr-2 ${selectedClasses}`}
        onClick={handleClick}
        style={{ backgroundColor: `${color}` }}
      ></button>
    </>
  );
}
