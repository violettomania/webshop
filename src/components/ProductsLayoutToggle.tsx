import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';

const selectedButtonClasses = 'btn-primary text-primary-content';
const unselectedButtonClasses = 'btn-ghost text-based-content';

type DisplayMode = 'list' | 'grid';

interface ProductsLayoutToggleProps {
  productQuantity: number;
  onToggle: () => void;
}

export default function ProductsLayoutToggle({
  productQuantity,
  onToggle,
}: ProductsLayoutToggleProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grid');

  const handleToggle = (display: DisplayMode) => {
    setDisplayMode(display);
    onToggle();
  };

  return (
    <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
      <h4 className='font-medium text-md'>{`${productQuantity} products`}</h4>
      <div className='flex gap-x-2'>
        <button
          onClick={() => handleToggle('grid')}
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
          onClick={() => handleToggle('list')}
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
