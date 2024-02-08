import { useState } from 'react';
import { Link } from 'react-router-dom';
import { URLParams } from '../actions/fetchProducts';

interface ProductsFilterProps {
  onSearch: (searchParams: URLParams) => void;
  onReset: () => void;
  categories: string[];
  companies: string[];
}

// TODO: filter should not disappear while loading, just disable it
// TODO: search input should remain after search
export default function ProductsFilter({
  onSearch,
  onReset,
  categories,
  companies,
}: ProductsFilterProps) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('all');
  const [company, setCompany] = useState('all');
  const [sortBy, setSortBy] = useState('a-z');
  const [price, setPrice] = useState(100000);
  const [freeShipping, setFreeShipping] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = {
      search: productName,
      category,
      company,
      order: sortBy,
      price,
      shipping: freeShipping,
    };
    onSearch(searchParams);
  };

  return (
    <form
      onSubmit={handleSearch}
      method='get'
      action='/products'
      className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'
    >
      <div className='form-control'>
        <label htmlFor='search' className='label'>
          <span className='label-text capitalize'>search product</span>
        </label>
        <input
          type='search'
          name='search'
          className='input input-bordered input-sm'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='category' className='label'>
          <span className='label-text capitalize'>select category</span>
        </label>
        <select
          name='category'
          id='category'
          className='select select-bordered select-sm'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className='form-control'>
        <label htmlFor='company' className='label'>
          <span className='label-text capitalize'>select company</span>
        </label>
        <select
          name='company'
          id='company'
          className='select select-bordered select-sm'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
      <div className='form-control'>
        <label htmlFor='order' className='label'>
          <span className='label-text capitalize'>sort by</span>
        </label>
        <select
          name='order'
          id='order'
          className='select select-bordered select-sm'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value='a-z'>a-z</option>
          <option value='z-a'>z-a</option>
          <option value='high'>high</option>
          <option value='low'>low</option>
        </select>
      </div>
      <div className='form-control'>
        <label htmlFor='price' className='label cursor-pointer'>
          <span className='label-text capitalize'>select price</span>
          <span>$1,000.00</span>
        </label>
        <input
          type='range'
          name='price'
          min='0'
          max='100000'
          className='range range-primary range-sm'
          step='1000'
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className='w-full flex justify-between text-xs px-2 mt-2'>
          <span className='font-bold text-md'>0</span>
          <span className='font-bold text-md'>Max : $1,000.00</span>
        </div>
      </div>
      <div className='form-control items-center'>
        <label htmlFor='shipping' className='label cursor-pointer'>
          <span className='label-text capitalize'>free shipping</span>
        </label>
        <input
          type='checkbox'
          name='shipping'
          className='checkbox checkbox-primary checkbox-sm'
          checked={freeShipping}
          onChange={(e) => setFreeShipping(e.target.checked)}
        />
      </div>
      <button type='submit' className='btn btn-primary btn-sm'>
        search
      </button>
      <Link className='btn btn-accent btn-sm' to='/products' onClick={onReset}>
        reset
      </Link>
    </form>
  );
}
