import { useAppSelector } from '../hooks/reduxHooksWrapper';
import { RootState } from '../state/store/store';

import Loading from './Loading';
import ProductCard from './ProductCard';

const gridDisplayClasses = 'pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3';
const listDisplayClasses = 'mt-12 grid gap-y-8';
const listCardDisplayClasses =
  'p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group';
const gridCardDisplayClasses =
  'card w-full shadow-xl hover:shadow-2xl transition duration-300';

export default function Products() {
  const pagedProducts = useAppSelector(
    (state: RootState) => state.paged.products
  );
  const loading = useAppSelector((state: RootState) => state.paged.loading);
  const displayMode = useAppSelector((state: RootState) => state.paged.layout);

  return loading ? (
    <Loading />
  ) : (
    <div>
      {pagedProducts.length === 0 ? (
        <h5 className='text-2xl mt-16'>
          Sorry, no products matched your search...
        </h5>
      ) : (
        <div
          className={`${
            displayMode === 'grid' ? gridDisplayClasses : listDisplayClasses
          }`}
        >
          {pagedProducts.map((product: ProductCard) => (
            <ProductCard
              key={product.id}
              classes={`${
                displayMode === 'grid'
                  ? gridCardDisplayClasses
                  : listCardDisplayClasses
              }`}
              {...product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
