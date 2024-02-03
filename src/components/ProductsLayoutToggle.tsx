import { BsFillGridFill, BsList } from 'react-icons/bs';

interface ProductsLayoutToggleProps {
  productQuantity: number;
}

// TODO: text-primary-content - always on the selected button
// list: mt-12 grid gap-y-8, grid: pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3

export default function ProductsLayoutToggle({
  productQuantity,
}: ProductsLayoutToggleProps) {
  return (
    <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
      <h4 className='font-medium text-md'>{`${productQuantity} products`}</h4>
      <div className='flex gap-x-2'>
        <button
          type='button'
          className='text-xl btn btn-circle btn-sm btn-primary text-primary-content'
        >
          <BsFillGridFill />
        </button>
        <button
          type='button'
          className='text-xl btn btn-circle btn-sm btn-ghost text-based-content'
        >
          <BsList />
        </button>
      </div>
    </div>
  );
}
