import { Link } from 'react-router-dom';

import Carousel from './Carousel';

export default function Hero() {
  return (
    <div className='grid lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl'>
          We are changing the way people shop
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
          repellat explicabo enim soluta temporibus asperiores aut obcaecati
          perferendis porro nobis.
        </p>
        <div className='mt-10'>
          <Link className='btn btn-primary' to='/products'>
            Our Products
          </Link>
        </div>
      </div>
      <Carousel />
    </div>
  );
}
