import { BsFillGridFill, BsList } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setLayout } from '../state/slices/productsSlice';
import { RootState } from '../state/store/store';

const selectedButtonClasses = 'btn-primary text-primary-content';
const unselectedButtonClasses = 'btn-ghost text-based-content';

interface ProductsLayoutToggleProps {
  productQuantity: number;
  onLayoutToggle: (event: React.MouseEvent, display: DisplayMode) => void;
}

// TODO: try to refactor this, maybe as a hook
export default function ProductsLayoutToggle({
  productQuantity,
  onLayoutToggle,
}: ProductsLayoutToggleProps) {
  const displayMode = useAppSelector((state: RootState) => state.paged.layout);
  const dispatch = useAppDispatch();

  const handleToggle = (event: React.MouseEvent, display: DisplayMode) => {
    dispatch(setLayout(display));
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
