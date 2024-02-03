import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';

const selectedButtonClasses = 'btn-primary text-primary-content';
const unselectedButtonClasses = 'btn-ghost text-based-content';

interface ProductsLayoutToggleProps {
  productQuantity: number;
  onLayoutToggle: (event: React.MouseEvent, display: DisplayMode) => void;
}

export default function ProductsLayoutToggle({
  productQuantity,
  onLayoutToggle,
}: ProductsLayoutToggleProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');

  const handleToggle = (event: React.MouseEvent, display: DisplayMode) => {
    setDisplayMode(display);
    onLayoutToggle(event, display);
  };

  return (
    <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
      <h4 className='font-medium text-md'>{`${productQuantity} products`}</h4>
      <div className='flex gap-x-2'>
        <button
          onClick={(e) => handleToggle(e, 'grid')}
          type='button'
          className={`text-xl btn btn-circle btn-sm ${
            displayMode === 'grid'
              ? selectedButtonClasses
              : unselectedButtonClasses
          }`}
        >
          <BsFillGridFill />
        </button>
        <button
          onClick={(e) => handleToggle(e, 'list')}
          type='button'
          className={`text-xl btn btn-circle btn-sm ${
            displayMode === 'list'
              ? selectedButtonClasses
              : unselectedButtonClasses
          }`}
        >
          <BsList />
        </button>
      </div>
    </div>
  );
}
